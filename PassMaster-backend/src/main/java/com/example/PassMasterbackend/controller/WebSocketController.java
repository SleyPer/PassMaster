package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.RoomRepository;
import com.example.PassMasterbackend.repository.UserRepository;
import com.example.PassMasterbackend.service.MessageService;
import com.example.PassMasterbackend.service.RoomService;
import com.example.PassMasterbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import javax.transaction.Transactional;
import java.util.*;


@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;
    @Autowired
    private UserService userService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, Message message) {
        System.out.println(message.getSender().getId());

        User sender = this.userService.getUserById(message.getSender().getId());
        message.setSender(sender);
        this.messageService.save(message);

        this.template.convertAndSend("/message/" + roomId, message);
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String userId = accessor.getFirstNativeHeader("userId");
        String roomId = accessor.getFirstNativeHeader("roomId");

        assert userId != null;
        User user = this.userService.getUserById(Long.valueOf(userId));
        user.setSessionId(accessor.getSessionId());
        Room room = this.roomService.getRoomById(roomId);
        List<String> sessions = room.getSessionIds();
        sessions.add(accessor.getSessionId());
        room.setSessionIds(sessions);
        this.userRepository.save(user);
        this.roomRepository.save(room);
        sendConnectedUsersList(room);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());

        User user = this.userService.getUserBySessionId(accessor.getSessionId());
        user.setSessionId(null);
        this.userRepository.save(user);
        List<Room> rooms = this.roomService.getAllRooms();
        Room room = null;
        for (Room r : rooms)
            for (String sessionId : r.getSessionIds())
                if (sessionId.equals(accessor.getSessionId()))
                    room = r;

        assert room != null;
        List<String> sessions = room.getSessionIds();
        sessions.removeIf(session -> session.equals(accessor.getSessionId()));

        room.setSessionIds(sessions);
        this.roomRepository.save(room);
        sendConnectedUsersList(room);
    }

    private void sendConnectedUsersList(Room room) {
        List<String> sessionsId = room.getSessionIds();
        List<Long> connectedUsers = new ArrayList<>();
        for (String sessionId: sessionsId)
            connectedUsers.add(this.userService.getUserBySessionId(sessionId).getId());

        this.template.convertAndSend("/connected-users/" + room.getId(), connectedUsers);
    }
}
