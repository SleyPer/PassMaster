package com.example.PassMasterbackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers(POST, "/api/user/registration").permitAll()
                                .requestMatchers(POST, "/api/user/activation").permitAll()
                                .requestMatchers(GET, "/api/chests").permitAll()
                                .requestMatchers(GET, "/api/chests/{id}").permitAll()
                                .requestMatchers(POST, "/api/chests").permitAll()
                                .requestMatchers(PUT, "/api/chests/{id}").permitAll()
                                .requestMatchers(DELETE, "/api/chests/{id}").permitAll()
                                .anyRequest().authenticated()
                ).build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
