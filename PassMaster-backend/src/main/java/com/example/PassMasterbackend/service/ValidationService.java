package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.entity.Validation;
import com.example.PassMasterbackend.repository.ValidationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@AllArgsConstructor
@Service
public class ValidationService {

    private ValidationRepository validationRepository;
    private NotificationService notificationService;

    public void save(User user) {
        Validation validation = new Validation();
        validation.setUser(user);
        Instant creation = Instant.now();
        Instant expiration = creation.plus(10, ChronoUnit.MINUTES);

        Random random = new Random();
        int randomInteger = random.nextInt(999999);
        String code = String.format("%06d", randomInteger);

        validation.setCreation(creation);
        validation.setExpiration(expiration);
        validation.setCode(code);

        this.validationRepository.save(validation);
        this.notificationService.send(validation);
    }

    public Validation getValidationByCode(String code) {
        return this.validationRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Code invalide"));
    }
}
