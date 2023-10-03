package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByMail(String userMail);
}
