package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MessageService {

    private MessageRepository messageRepository;

    public void save(Message message) {
        this.messageRepository.save(message);
    }

    public List<Message> getMessagesByRoomId(String roomId) {
        return this.messageRepository.findByRoomId(roomId).orElse(null);
    }
}
