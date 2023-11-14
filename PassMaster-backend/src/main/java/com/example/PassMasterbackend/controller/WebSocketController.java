package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.UserRepository;
import com.example.PassMasterbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.*;


@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    private final Map<String, List<String>> connectedUsers = new HashMap<>();

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, Message message) {
        User user = this.userService.getUserById(message.getSenderId());
        message.setSender(user);
        this.template.convertAndSend("/message/" + roomId, message);
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
        System.out.println(accessor);
        String userId = accessor.getFirstNativeHeader("userId");
        String roomId = accessor.getFirstNativeHeader("roomId");

        assert userId != null;
        User user = this.userService.getUserById(Long.valueOf(userId));
        user.setSessionId(accessor.getSessionId());
        this.userRepository.save(user);
        connectedUsers.computeIfAbsent(roomId, k -> new ArrayList<>()).add(user.getSessionId());
        System.out.println(connectedUsers.values());
        sendConnectedUsersList(roomId);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String roomId = (String) Objects.requireNonNull(accessor.getSessionAttributes()).get("roomId");
        System.out.println(accessor);
        System.out.println("roomId : " + roomId);

        User user = this.userService.getUserBySessionId(accessor.getSessionId());
        connectedUsers.getOrDefault(roomId, Collections.emptyList()).remove(user.getSessionId());
        user.setSessionId(null);
        this.userRepository.save(user);
        System.out.println(connectedUsers.values());
        sendConnectedUsersList(roomId);
    }

    private void sendConnectedUsersList(String roomId) {
        List<String> sessionsId = connectedUsers.getOrDefault(roomId, Collections.emptyList());
        this.template.convertAndSend("/connected-users/" + roomId, sessionsId);
    }

}
