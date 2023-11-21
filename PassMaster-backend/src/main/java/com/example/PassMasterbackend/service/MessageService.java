package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

@AllArgsConstructor
@Service
public class MessageService {

    private MessageRepository messageRepository;

    private static final Key SECRET_KEY = generateKey();

    private static Key generateKey() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
            keyGenerator.init(128);
            return keyGenerator.generateKey();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erreur lors de la génération de la clé secrète", e);
        }
    }

    public void save(Message message) {
        String encryptedContent = encrypt(message.getContent());
        message.setContent(encryptedContent);

        this.messageRepository.save(message);
    }

    public List<Message> getMessagesByRoomId(String roomId) {
        List<Message> messages = this.messageRepository.findByRoomId(roomId).orElse(null);

        if (messages != null) {
            messages.forEach(message -> {
                String decryptedContent = decrypt(message.getContent());
                message.setContent(decryptedContent);
            });
        }

        return messages;
    }

    private String encrypt(String input) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, SECRET_KEY);
            byte[] encryptedBytes = cipher.doFinal(input.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du chiffrement du message", e);
        }
    }

    private String decrypt(String encryptedInput) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, SECRET_KEY);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedInput));
            return new String(decryptedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du déchiffrement du message", e);
        }
    }
}
