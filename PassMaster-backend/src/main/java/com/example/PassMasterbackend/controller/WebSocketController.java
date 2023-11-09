package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;
    @Autowired
    private UserService userService;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void sendMessage(Message message){
        User user = this.userService.getUserById(message.getSenderId());
        message.setSender(user);
        System.out.println("sender : " + message.getSender() + ", content : " + message.getContent() + ", timestamp : " + message.getTimestamp());
        this.template.convertAndSend("/message",  message);
    }
}
