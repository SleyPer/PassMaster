package com.example.PassMasterbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "jwt")
public class Jwt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;
    private boolean desactive;
    private boolean expire;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.REMOVE })
    private RefreshToken refreshToken;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE })
    private User user;
}
