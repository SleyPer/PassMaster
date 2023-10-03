package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Chest;
import com.example.PassMasterbackend.service.ChestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chests")
public class ChestController {

    @Autowired
    private ChestService chestService;

    @GetMapping
    public List<Chest> getAllChests() {
        return chestService.getAllChests();
    }

    @GetMapping("/{id}")
    public Chest getChestById(@PathVariable Long id) {
        return chestService.getChestById(id);
    }

    @PostMapping
    public ResponseEntity<?> createChest(@RequestBody Chest chest) {
        return ResponseEntity.ok(chestService.createChest(chest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Chest chest) {
        return ResponseEntity.ok(chestService.updateChest(id, chest));
    }

    @DeleteMapping("/{id}")
    public void deleteChest(@PathVariable Long id) {
        chestService.deleteChest(id);
    }
}
