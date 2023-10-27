package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Chest;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.ChestRepository;
import com.example.PassMasterbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChestService {

    @Autowired
    private ChestRepository chestRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Chest> getAllChests() {
        return chestRepository.findAll();
    }

    public Chest getChestById(Long id) {
        return chestRepository.findById(id).orElse(null);
    }

    public ResponseEntity<?> createChest(Chest chest) {
        chest.setCreationDate(LocalDateTime.now());

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.userRepository.findByMail(username).orElseThrow(
                () -> new RuntimeException("Vous devez vous connecter pour créer un coffre")
        );

        chest.setUser(user);

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

            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userRepository.findByMail(username).orElseThrow(
                    () -> new RuntimeException("Vous devez vous connecter pour modifier un coffre")
            );

            existingChest.setUser(user);

            return ResponseEntity.ok(chestRepository.save(existingChest));
        }

        return ResponseEntity.notFound().build();
    }

    public void deleteChest(Long id) {
        chestRepository.deleteById(id);
    }

    public List<Chest> getChestsByUserId(Long userId) {
        return chestRepository.findByUserId(userId);
    }
}
