package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Role;
import com.example.PassMasterbackend.entity.RoleType;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.entity.Validation;
import com.example.PassMasterbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private ValidationService validationService;

    public void registration(User user) {
        if (!user.getMail().contains("@") && !user.getMail().contains(".")) {
            throw new RuntimeException("Mail invalide !");
        }

        Optional<User> optionalUser = this.userRepository.findByMail(user.getMail());
        if (optionalUser.isPresent()) {
            throw new RuntimeException("Ce mail existe déjà !");
        }

        String cryptedPass = this.passwordEncoder.encode(user.getPass());
        user.setPass(cryptedPass);

        Role userRole = new Role();
        userRole.setName(RoleType.USER);
        user.setRole(userRole);

        user = this.userRepository.save(user);
        this.validationService.save(user);
    }

    public void activation(Map<String, String> activation) {
        Validation validation = this.validationService.getValidationByCode(activation.get("code"));
        if (Instant.now().isAfter(validation.getExpiration())) {
            throw new RuntimeException("Votre code a expiré");
        }

        User activatedUser = this.userRepository.findById(Math.toIntExact(validation.getUser().getId()))
                .orElseThrow(() -> new RuntimeException("utilisateur inconnu"));

        activatedUser.setActive(true);
        this.userRepository.save(activatedUser);
    }
}
