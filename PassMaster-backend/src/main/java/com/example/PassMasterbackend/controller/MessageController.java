package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.service.MessageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/message")
public class MessageController {

    private MessageService messageService;

    @GetMapping("/{roomId}")
    public List<Message> getMessageByRoomId(@PathVariable String roomId) {
        return messageService.getMessagesByRoomId(roomId);
    }
}
