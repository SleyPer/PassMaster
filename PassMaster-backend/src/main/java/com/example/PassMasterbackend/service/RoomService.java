package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RoomService {

    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return this.roomRepository.findAll();
    }

    public Room getRoomById(String id) {
        return this.roomRepository.findById(id).orElse(null);
    }

    public ResponseEntity<?> updateRoom(String id, Room room) {
        Room existingRoom = this.roomRepository.findById(id).orElse(null);
        if (existingRoom != null) {
            existingRoom.setName(room.getName());
            existingRoom.setUsers(room.getUsers());
            return ResponseEntity.ok(roomRepository.save(existingRoom));
        }

        return ResponseEntity.notFound().build();
    }

    public List<Room> getRoomsByName(String name) {
        name = name.replaceAll("\\s", "");
        return roomRepository.findByNameContaining(name).orElseThrow(
                () -> new RuntimeException("Aucun groupe trouvé")
        );
    }

    public List<Room> getRoomsByUserId(Long id) {
        List<Room> userRooms = new ArrayList<>();

        List<Room> rooms = this.getAllRooms();
        for (Room r : rooms) {
            List<User> users = r.getUsers();
            for (User u : users)
                if (Objects.equals(u.getId(), id))
                    userRooms.add(r);
        }

        return userRooms;
    }

    public ResponseEntity<?> addRoom(Room room) {
        Optional<Room> optionalRoom = this.roomRepository.findByName(room.getName());
        if (optionalRoom.isPresent()) {
            throw new RuntimeException("Ce nom existe déjà !");
        }

        return ResponseEntity.ok(this.roomRepository.save(room));
    }

    public void deleteRoom(String id) {
        this.roomRepository.deleteById(id);
    }
}
