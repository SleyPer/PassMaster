package com.example.PassMasterbackend.security;

import com.example.PassMasterbackend.entity.Jwt;
import com.example.PassMasterbackend.entity.RefreshToken;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.repository.JwtRepository;
import com.example.PassMasterbackend.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class JwtService {
    public static final String BEARER = "bearer";
    public static final String REFRESH = "refresh";
    public static final String INVALID_TOKEN = "Token invalide";
    private final String ENCRIPTION_KEY = "608f36e92dc66d97d5933f0e6371493cb4fc05b1aa8f8de64014732472303a7c";
    private UserService userService;
    private JwtRepository jwtRepository;

    public Jwt tokenByValue(String value) {
        return this.jwtRepository.findByValueAndDesactiveAndExpire(
                value,
                false,
                false
        ).orElseThrow(() -> new RuntimeException("Token invalide ou inconnu"));
    }
    public Map<String, String> generate(String username) {
        User user = this.userService.loadUserByUsername(username);
        this.disableTokens(user);
        final Map<String, String> jwtMap = new java.util.HashMap<>(this.generateJwt(user));

        RefreshToken refreshToken = RefreshToken.builder()
                .value(UUID.randomUUID().toString())
                .expire(false)
                .creationDate(Instant.now())
                .expirationDate(Instant.now().plusMillis(30 *60 *1000))
                .build();

        final Jwt jwt = Jwt
                .builder()
                .value(jwtMap.get(BEARER))
                .desactive(false)
                .expire(false)
                .user(user)
                .refreshToken(refreshToken)
                .build();

        this.jwtRepository.save(jwt);
        jwtMap.put(REFRESH,  refreshToken.getValue());
        return jwtMap;
    }

    private void disableTokens(User user) {
        final List<Jwt> jwtList = this.jwtRepository.findUser(user.getMail()).peek(
                jwt -> {
                    jwt.setDesactive(true);
                    jwt.setExpire(true);
                }
        ).collect(Collectors.toList());

        this.jwtRepository.saveAll(jwtList);
    }

    public String extractUsername(String token) {
        return this.getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }

    private Date getExpirationDateFromToken(String token) {
        return this.getClaim(token, Claims::getExpiration);
    }

    private <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Map<String, String> generateJwt(User user) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 60 * 60 * 1000;

        final Map<String, Object> claims = Map.of(
                "name", user.getFirstName() + " " + user.getLastName(),
                Claims.ID, user.getId(),
                Claims.EXPIRATION, new Date(expirationTime),
                Claims.SUBJECT, user.getMail()
        );

        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(user.getMail())
                .setClaims(claims)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return Map.of(BEARER, bearer);
    }

    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(ENCRIPTION_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }

    public void logout() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Jwt jwt = this.jwtRepository.findUserValidToken(
                user.getMail(),
                false,
                false
        ).orElseThrow(() -> new RuntimeException(INVALID_TOKEN));
        jwt.setExpire(true);
        jwt.setDesactive(true);
        this.jwtRepository.save(jwt);
    }

    @Scheduled(cron = "@daily")
    public void removeUselessJwt() {
        log.info("Suppression des token à {}", Instant.now());
        this.jwtRepository.deleteAllByExpireAndDesactive(true, true);
    }

    public Map<String, String> refreshToken(Map<String, String> refreshTokenRequest) {
        final Jwt jwt = this.jwtRepository.findByRefreshToken(refreshTokenRequest.get(REFRESH)).orElseThrow(() -> new RuntimeException(INVALID_TOKEN));
        if (jwt.getRefreshToken().isExpire() || jwt.getRefreshToken().getExpirationDate().isBefore(Instant.now())) {
            throw new RuntimeException(INVALID_TOKEN);
        }
        this.disableTokens(jwt.getUser());
        return this.generate(jwt.getUser().getMail());
    }
}