package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Role;
import com.example.PassMasterbackend.entity.RoleType;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

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

        this.userRepository.save(user);
    }
}
