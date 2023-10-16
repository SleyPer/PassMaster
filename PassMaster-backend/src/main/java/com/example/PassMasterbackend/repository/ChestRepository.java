package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Chest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChestRepository extends JpaRepository<Chest, Long> {

    List<Chest> findByUserId(Long userId);
}
