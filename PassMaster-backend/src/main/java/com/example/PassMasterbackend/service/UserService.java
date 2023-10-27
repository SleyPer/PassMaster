package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.*;
import com.example.PassMasterbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

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

        User activatedUser = this.userRepository.findById(validation.getUser().getId())
                .orElseThrow(() -> new RuntimeException("utilisateur inconnu"));

        activatedUser.setActive(true);
        this.userRepository.save(activatedUser);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByMail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur trouvé"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Object updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setMail(user.getMail());
            String cryptedPass = this.passwordEncoder.encode(user.getPass());
            existingUser.setPass(cryptedPass);

            return ResponseEntity.ok(userRepository.save(existingUser));
        }

        return ResponseEntity.notFound().build();
    }
}
