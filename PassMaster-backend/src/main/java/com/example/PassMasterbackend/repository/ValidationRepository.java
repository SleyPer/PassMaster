package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Validation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface ValidationRepository extends JpaRepository<Validation, Long> {

    Optional<Validation> findByCode(String code);

    void deleteAllByExpirationBefore(Instant now);
}
