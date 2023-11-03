package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
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

    public List<Message> getSentByUserIdToRecipientId(Long userId, Long recipientId) {
        User user = this.userService.getUserById(userId);

        List<Message> result = new ArrayList<>();
        for (Message message : user.getSentMessages())
            if (message.getRecipient().getId().equals(recipientId))
                result.add(message);

        return result;
    }

    public List<Message> getReceivedByUserIdFromSenderId(Long userId, Long senderId) {
        User user = this.userService.getUserById(userId);

        List<Message> result = new ArrayList<>();
        for (Message message : user.getReceivedMessages())
            if (message.getSender().getId().equals(senderId))
                result.add(message);

        return result;
    }

    public List<Message> getAllByUserIdWithFriendId(Long userId, Long friendId) {
        List<Message> sent = getSentByUserIdToRecipientId(userId, friendId);
        List<Message> received = getReceivedByUserIdFromSenderId(userId, friendId);

        List<Message> allMessages = new ArrayList<>();
        allMessages.addAll(sent);
        allMessages.addAll(received);

        allMessages.sort(Comparator.comparing(Message::getTimestamp));

        return allMessages;
    }

}
