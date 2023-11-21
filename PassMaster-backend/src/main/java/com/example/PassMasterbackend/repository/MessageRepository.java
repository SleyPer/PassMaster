package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findByRoomId(String roomId);
}
