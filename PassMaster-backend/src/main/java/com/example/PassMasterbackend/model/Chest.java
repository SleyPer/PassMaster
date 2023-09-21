package com.example.PassMasterbackend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Chest")
public class Chest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chest_id")
    private Long chest_id;

    @Column(nullable = false)
    private String chest_name;

    @Column
    private String chest_description;

    @Column
    private LocalDateTime chest_creationDate;

    @Column
    private String chest_username;

    @Column
    private String chest_password;

    @Column
    private String chest_link;

    public Chest() {
        this.chest_creationDate = LocalDateTime.now();
    }

    public Chest(String name, String description, String username, String password, String link) {
        this.chest_name = name;
        this.chest_description = description;
        this.chest_creationDate = LocalDateTime.now();
        this.chest_username = username;
        this.chest_password = password;
        this.chest_link = link;
    }
    public Long getChest_id() {
        return chest_id;
    }

    public void setChest_id(Long chest_id) {
        this.chest_id = chest_id;
    }

    public String getChest_name() {
        return chest_name;
    }

    public void setChest_name(String chest_name) {
        this.chest_name = chest_name;
    }

    public String getChest_description() {
        return chest_description;
    }

    public void setChest_description(String chest_description) {
        this.chest_description = chest_description;
    }

    public LocalDateTime getChest_creationDate() {
        return chest_creationDate;
    }

    public void setChest_creationDate(LocalDateTime chest_creationDate) {
        this.chest_creationDate = chest_creationDate;
    }

    public String getChest_username() {
        return chest_username;
    }

    public void setChest_username(String chest_username) {
        this.chest_username = chest_username;
    }

    public String getChest_password() {
        return chest_password;
    }

    public void setChest_password(String chest_password) {
        this.chest_password = chest_password;
    }

    public String getChest_link() {
        return chest_link;
    }

    public void setChest_link(String chest_link) {
        this.chest_link = chest_link;
    }
}
