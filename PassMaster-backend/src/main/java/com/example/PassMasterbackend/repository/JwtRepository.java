package com.example.PassMasterbackend.repository;

import com.example.PassMasterbackend.entity.Jwt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.stream.Stream;

public interface JwtRepository extends JpaRepository<Jwt, Long> {
    @Query("FROM Jwt j WHERE j.expire = :expire AND j.desactive = :desactive AND j.user.mail = :mail")
    Optional<Jwt> findUserValidToken(String mail, boolean desactive, boolean expire);

    Optional<Jwt> findByValueAndDesactiveAndExpire(String value, boolean desactive, boolean expire);

    @Query("FROM Jwt j WHERE j.user.mail = :mail")
    Stream<Jwt> findUser(String mail);
    @Query("FROM Jwt j WHERE j.refreshToken.value = :value")
    Optional<Jwt> findByRefreshToken(String value);

    void deleteAllByExpireAndDesactive(boolean expire, boolean desactive);
}
