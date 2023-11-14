package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, String>  {
    Optional<List<Room>> findByNameContaining(String name);

    Optional<Room> findByName(String name);
}
