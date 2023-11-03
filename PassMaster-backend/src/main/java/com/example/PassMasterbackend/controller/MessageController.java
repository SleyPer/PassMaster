package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.service.MessageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/message")
public class MessageController {

    private MessageService messageService;

    @PostMapping("send")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> requestBody) {
        Integer senderId = (Integer) requestBody.get("sender");
        Integer recipientId = (Integer) requestBody.get("recipient");
        String content = (String) requestBody.get("content");

        return messageService.sendMessage(senderId.longValue(), recipientId.longValue(), content);
    }

    @GetMapping("received/{id}")
    public List<Message> getReceivedByUserId(@PathVariable Long id) {
        return messageService.getReceivedByUserId(id);
    }

    @GetMapping("sent/{id}")
    public List<Message> getSentByUserId(@PathVariable Long id) {
        return messageService.getSentByUserId(id);
    }
}
