package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.exception.ChestNotFoundException;
import com.example.PassMasterbackend.model.Chest;
import com.example.PassMasterbackend.repository.ChestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        return ResponseEntity.ok(chestRepository.save(chest));
    }

    public ResponseEntity<?> updateChest(Long id, Chest chest) {
        Chest existingChest = chestRepository.findById(id).orElse(null);
        if (existingChest != null) {
            existingChest.setChest_name(chest.getChest_name());
            existingChest.setChest_description(chest.getChest_description());
            existingChest.setChest_username(chest.getChest_username());
            existingChest.setChest_password(chest.getChest_password());
            existingChest.setChest_link(chest.getChest_link());

            return ResponseEntity.ok(chestRepository.save(existingChest));
        }

        return ResponseEntity.notFound().build();
    }

    public void deleteChest(Long id) {
        chestRepository.deleteById(id);
    }
}
