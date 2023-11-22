package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.entity.UserRoomUnreadMessages;
import com.example.PassMasterbackend.repository.UserRoomUnreadMessagesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserRoomUnreadMessagesService {

    private UserRoomUnreadMessagesRepository userRoomUnreadMessagesRepository;

    public void save(UserRoomUnreadMessages userRoomUnreadMessages) {
        this.userRoomUnreadMessagesRepository.save(userRoomUnreadMessages);
    }

    public UserRoomUnreadMessages findByUserAndRoom(User user, Room room) {
        return this.userRoomUnreadMessagesRepository.findByUserAndRoom(user, room).orElse(null);
    }
}
