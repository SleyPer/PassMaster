package com.example.PassMasterbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "refresh-token")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean expire;
    private String value;
    private Instant creationDate;
    private Instant expirationDate;
}
