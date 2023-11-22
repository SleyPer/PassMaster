package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.entity.UserRoomUnreadMessages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoomUnreadMessagesRepository extends JpaRepository<UserRoomUnreadMessages, Long> {
    Optional<UserRoomUnreadMessages> findByUserAndRoom(User user, Room room);
}
