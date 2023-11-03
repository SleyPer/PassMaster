package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
