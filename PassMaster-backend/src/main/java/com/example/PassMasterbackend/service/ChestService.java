package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Chest;
import com.example.PassMasterbackend.repository.ChestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChestService {

    @Autowired
    private ChestRepository chestRepository;

    public List<Chest> getAllChests() {
        return chestRepository.findAll();
    }

    public Chest getChestById(Long id) {
        return chestRepository.findById(id).orElse(null);
    }

    public ResponseEntity<?> createChest(Chest chest) {
        chest.setCreationDate(LocalDateTime.now());
        return ResponseEntity.ok(chestRepository.save(chest));
    }

    public ResponseEntity<?> updateChest(Long id, Chest chest) {
        Chest existingChest = chestRepository.findById(id).orElse(null);
        if (existingChest != null) {
            existingChest.setName(chest.getName());
            existingChest.setDescription(chest.getDescription());
            existingChest.setUsername(chest.getUsername());
            existingChest.setPassword(chest.getPassword());
            existingChest.setLink(chest.getLink());

            return ResponseEntity.ok(chestRepository.save(existingChest));
        }

        return ResponseEntity.notFound().build();
    }

    public void deleteChest(Long id) {
        chestRepository.deleteById(id);
    }
}
