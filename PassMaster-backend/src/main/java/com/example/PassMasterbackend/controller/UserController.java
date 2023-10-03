package com.example.PassMasterbackend.controller;

import com.example.PassMasterbackend.entity.Role;
import com.example.PassMasterbackend.entity.RoleType;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private UserService userService;

    @PostMapping(path = "registration")
    public void registration(/*@RequestBody User user*/) {
        //this.userService.registration(user);
        log.info("Inscription");
    }

    @PostMapping(path = "activation")
    public void activation(@RequestBody Map<String, String> activation) {
        this.userService.activation(activation);
    }
}
