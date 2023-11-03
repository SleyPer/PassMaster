package com.example.PassMasterbackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(BCryptPasswordEncoder bCryptPasswordEncoder, JwtFilter jwtFilter, UserDetailsService userDetailsService) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers(POST, "/api/user/registration").permitAll()
                                .requestMatchers(POST, "/api/user/activation").permitAll()
                                .requestMatchers(POST, "/api/user/reset-password-mail").permitAll()
                                .requestMatchers(POST, "/api/user/reset-password").permitAll()
                                .requestMatchers(POST, "/api/user/login").permitAll()
                                .requestMatchers(POST, "/api/user/logout").permitAll()
                                .requestMatchers(POST, "/api/user/refresh-token").permitAll()
                                .requestMatchers(GET, "/api/user").permitAll()
                                .requestMatchers(GET, "/api/user/{id}").permitAll()
                                .requestMatchers(GET, "/api/user/search").permitAll()
                                .requestMatchers(PUT, "/api/user/{id}").permitAll()
                                .requestMatchers(GET, "/api/user/{id}/friends").permitAll()
                                .requestMatchers(PUT, "/api/user/{userId}/addFriend").permitAll()
                                .requestMatchers(DELETE, "/api/user/{userId}/deleteFriend/{friendId}").permitAll()
                                .requestMatchers(POST, "/api/message/send").permitAll()
                                .requestMatchers(GET, "/api/message/received/{id}").permitAll()
                                .requestMatchers(GET, "/api/message/sent/{id}").permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return daoAuthenticationProvider;
    }
}
