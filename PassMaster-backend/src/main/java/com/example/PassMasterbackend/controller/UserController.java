package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.dto.AuthenticationDTO;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.security.JwtService;
import com.example.PassMasterbackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(path = "reset-password-mail")
    public void sendResetPasswordMail(@RequestBody Map<String, String> params) {
        this.userService.sendResetPasswordMail(params);
    }

    @PostMapping(path = "reset-password")
    public void resetPassword(@RequestBody Map<String, String> params) {
        this.userService.resetPassword(params);
    }

    @PostMapping(path = "refresh-token")
    public @ResponseBody Map<String, String> refreshToken(@RequestBody Map<String, String> refreshTokenRequest) {
        return this.jwtService.refreshToken(refreshTokenRequest);
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

    @PostMapping(path = "logout")
    public void logout() {
        this.jwtService.logout();
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @GetMapping("/{id}/search")
    public List<User> getUsersByMail(@PathVariable Long id, @RequestParam String mail) {
        return userService.getUsersByMail(id, mail);
    }

    @GetMapping("/{id}/friends")
    public List<User> getFriendsByUserId(@PathVariable Long id) {
        return userService.getFriendsByUserId(id);
    }

    @PutMapping("/{userId}/addFriend")
    public ResponseEntity<?> addFriend(@PathVariable Long userId, @RequestBody Long friendId) {

        return ResponseEntity.ok(userService.addFriend(userId, friendId));
    }

    @DeleteMapping("/{userId}/deleteFriend/{friendId}")
    public void deleteFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        userService.deleteFriend(userId, friendId);
    }
}
