package com.example.PassMasterbackend.entity;

import com.example.PassMasterbackend.deserializer.RoomDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "room")
@JsonDeserialize(using = RoomDeserializer.class)
public class Room {

    @Id
    @Column(name = "room_id")
    private String id;

    @Column
    private String name;

    @ManyToMany
    @JoinTable(
            name = "room_users",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )

    private List<User> users;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "room_session_ids",
            joinColumns = @JoinColumn(name = "room_id")
    )
    @Column(name = "session_id")
    private List<String> sessionIds;
}
