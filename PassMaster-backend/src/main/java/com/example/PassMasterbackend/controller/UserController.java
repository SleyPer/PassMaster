package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.dto.AuthenticationDTO;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.security.JwtService;
import com.example.PassMasterbackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtService jwtService;

    @PostMapping(path = "registration")
    public void register(@RequestBody User user) {
        this.userService.registration(user);
    }

    @PostMapping(path = "activation")
    public void activate(@RequestBody Map<String, String> activation) {
        this.userService.activation(activation);
    }

    @PostMapping(path = "login")
    public Map<String, String> login(@RequestBody AuthenticationDTO authenticationDTO) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationDTO.username(),
                        authenticationDTO.password()
                )
        );

        if (authentication.isAuthenticated()) {
            return this.jwtService.generate(authenticationDTO.username());
        }
        return null;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
