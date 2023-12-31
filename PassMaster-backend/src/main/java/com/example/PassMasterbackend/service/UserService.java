package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.*;
import com.example.PassMasterbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private ValidationService validationService;

    private static String errorMsg;

    public void registration(User user) {
        if (this.verifyFields(user)) {
            Optional<User> optionalUser = this.userRepository.findByMail(user.getMail());
            if (optionalUser.isPresent()) {
                throw new RuntimeException("Ce mail existe déjà !");
            }

            String cryptedPass = this.passwordEncoder.encode(user.getPass());
            user.setPass(cryptedPass);

            Role userRole = new Role();
            userRole.setName(RoleType.USER);
            user.setRole(userRole);

            Random random = new Random();
            user.setColor(String.format("#%06x", random.nextInt(0xFFFFFF + 1)));

            user = this.userRepository.save(user);
            this.validationService.save(user);
        } else
            throw new RuntimeException(errorMsg);
    }

    public void activation(Map<String, String> activation) {
        Validation validation = this.validationService.getValidationByCode(activation.get("code"));
        if (Instant.now().isAfter(validation.getExpiration())) {
            throw new RuntimeException("Votre code a expiré");
        }

        User activatedUser = this.userRepository.findById(validation.getUser().getId())
                .orElseThrow(() -> new RuntimeException("utilisateur inconnu"));

        activatedUser.setActive(true);
        this.userRepository.save(activatedUser);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByMail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur trouvé"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Object updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (this.verifyFields(user)) {
                Optional<User> optionalUser = this.userRepository.findByMail(user.getMail());
                if (optionalUser.isPresent()) {
                    if (!Objects.equals(optionalUser.get().getId(), existingUser.getId())) {
                        throw new RuntimeException("Ce mail existe déjà !");
                    }
                }
                existingUser.setFirstName(user.getFirstName());
                existingUser.setLastName(user.getLastName());
                existingUser.setMail(user.getMail());
                String encryptedPass = this.passwordEncoder.encode(user.getPass());
                existingUser.setPass(encryptedPass);

                return ResponseEntity.ok(userRepository.save(existingUser));
            }

            return ResponseEntity.badRequest().body(errorMsg);

        }

        return ResponseEntity.notFound().build();
    }

    private boolean verifyFields(User user) {
        if (user.getFirstName().trim().isEmpty()) {
            errorMsg = "Le prénom ne peut pas être vide";
            return false;
        }

        if (user.getLastName().trim().isEmpty()) {
            errorMsg = "Le nom de famille ne peut pas être vide";
            return false;
        }

        if (!user.getMail().trim().isEmpty()) {
            String mailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,7}$";
            Pattern mailPattern = Pattern.compile((mailRegex));
            Matcher mailMatcher = mailPattern.matcher(user.getMail());
            if (!mailMatcher.matches()) {
                errorMsg = "Le format de l'adresse mail est incorrect";
                return false;
            }
        } else {
            errorMsg = "L'adresse mail ne peut pas être vide";
            return false;
        }

        if (!user.getPass().trim().isEmpty()) {
            if (user.getPass().length() >= 8) {
                String uppercaseLetterRegex = ".*[A-Z].*";
                Pattern uppercaseLetterPattern = Pattern.compile(uppercaseLetterRegex);
                Matcher uppercaseLetterMatcher = uppercaseLetterPattern.matcher(user.getPass());
                if (uppercaseLetterMatcher.matches()) {
                    String digitRegex = ".*\\d.*";
                    Pattern digitPattern = Pattern.compile(digitRegex);
                    Matcher digitMatcher = digitPattern.matcher(user.getPass());
                    if (digitMatcher.matches()) {
                        String specialRegex = ".*[^A-Za-z0-9].*";
                        Pattern specialPattern = Pattern.compile(specialRegex);
                        Matcher specialMatcher = specialPattern.matcher(user.getPass());
                        if (specialMatcher.matches()) {
                            return true;
                        } else {
                            errorMsg = "Le mot de passe doit contenir au moins un caractère spécial";
                            return false;
                        }
                    } else {
                        errorMsg = "Le mot de passe doit contenir au moins un chiffre";
                        return false;
                    }
                } else {
                    errorMsg = "Le mot de passe doit contenir au moins une lettre majuscule";
                    return false;
                }
            } else {
                errorMsg = "Le mot de passe doit contenir au moins 8 caractères";
                return false;
            }
        } else {
            errorMsg = "Le mot de passe ne peut pas être vide";
            return false;
        }
    }

    public List<User> getUsersByMail(Long id, String mail) {
        mail = mail.replaceAll("\\s", "");
        User me = this.userRepository.findById(id).orElse(null);

        return userRepository.findByMailContaining(mail)
                .orElseThrow(() -> new RuntimeException("Aucun utilisateur trouvé"))
                .stream()
                .filter(user -> !user.equals(me))
                .filter(user -> {
                    assert me != null;
                    return !me.getFriends().contains(user);
                })
                .collect(Collectors.toList());
    }



    public User getUserBySessionId(String sessionId) {
        return userRepository.findBySessionId(sessionId).orElseThrow(
                () -> new RuntimeException("Aucun utilisateur trouvé")
        );
    }

    public List<User> getFriendsByUserId(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Utilisateur inconnu")
        );

        return user.getFriends();
    }

    public ResponseEntity<?> addFriend(Long userId, Long friendId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Utilisateur inconnu")
        );

        User friend = userRepository.findById(friendId).orElseThrow(
                () -> new RuntimeException("Ami inconnu")
        );

        user.getFriends().add(friend);
        friend.getFriends().add(user);
        userRepository.save(user);
        userRepository.save(friend);
        return ResponseEntity.ok("Ami ajouté avec succès");
    }

    public void deleteFriend(Long userId, Long friendId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Utilisateur inconnu")
        );

        User friend = userRepository.findById(friendId).orElseThrow(
                () -> new RuntimeException("Ami inconnu")
        );

        user.getFriends().removeIf(u -> Objects.equals(u.getId(), friend.getId()));
        friend.getFriends().removeIf(u -> Objects.equals(u.getId(), user.getId()));
        userRepository.save(user);
        userRepository.save(friend);
    }

    public void sendResetPasswordMail(Map<String, String> params) {
        User user = loadUserByUsername(params.get("mail"));
        this.validationService.save(user);
    }

    public void resetPassword(Map<String, String> params) {
        User user = loadUserByUsername(params.get("mail"));
        final Validation validation = validationService.getValidationByCode(params.get("code"));
        if (validation.getUser().getMail().equals(user.getMail())) {
            String cryptedPass = this.passwordEncoder.encode(params.get("password"));
            user.setPass(cryptedPass);
            this.userRepository.save(user);
        }
    }
}
