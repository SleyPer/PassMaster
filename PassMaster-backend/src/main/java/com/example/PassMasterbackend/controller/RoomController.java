package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.service.RoomService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/room")
public class RoomController {

    private RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable String id) {
        return roomService.getRoomById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable String id, @RequestBody Room room) {
        return ResponseEntity.ok(roomService.updateRoom(id, room));
    }

    @GetMapping("search")
    public List<Room> getRoomsByName(@RequestParam String name) {
        return roomService.getRoomsByName(name);
    }

    @GetMapping("/{id}/rooms")
    public List<Room> getRoomsByUserId(@PathVariable Long id) {
        return roomService.getRoomsByUserId(id);
    }

    @PostMapping
    public ResponseEntity<?> addRoom(@RequestBody Room room) {
        System.out.println(room.getId());
        System.out.println(room.getName());
        return ResponseEntity.ok(roomService.addRoom(room));
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
    }
}
