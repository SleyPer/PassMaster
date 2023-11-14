package com.example.PassMasterbackend.entity;

import com.example.PassMasterbackend.deserializer.UserDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
@JsonDeserialize(using = UserDeserializer.class)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String pass;

    @Column(nullable = false)
    private String mail;

    @JsonIgnore
    private boolean active = false;

    private String sessionId;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Role role;

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    @JsonIgnore
    private List<User> friends;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role.getName()));
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.pass;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return this.mail;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return this.active;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return this.active;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return this.active;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return this.active;
    }
}
