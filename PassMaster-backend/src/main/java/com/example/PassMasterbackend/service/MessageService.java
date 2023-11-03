package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@Service
public class MessageService {

    private MessageRepository messageRepository;
    private UserService userService;
    public ResponseEntity<?> sendMessage(Long senderId, Long recipientId, String content) {
        User sender = this.userService.getUserById(senderId);
        User recipient = this.userService.getUserById(recipientId);

        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);
        message.setTimestamp(Instant.now());
        return ResponseEntity.ok(messageRepository.save(message));
    }

    public List<Message> getReceivedByUserId(Long id) {
        User user = this.userService.getUserById(id);
        return user.getReceivedMessages();
    }

    public List<Message> getSentByUserId(Long id) {
        User user = this.userService.getUserById(id);
        return user.getSentMessages();
    }
}
