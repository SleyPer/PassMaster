package com.example.PassMasterbackend.service;

import com.example.PassMasterbackend.entity.Validation;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NotificationService {

    JavaMailSender javaMailSender;

    public void send(Validation validation) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("np-reply@thom.fr");
        mailMessage.setTo(validation.getUser().getMail());
        mailMessage.setSubject("Code d'activation de votre compte PassMaster");

        String text = String.format("Bonjour %s ! <br /> Votre code d'activation est %s; A bientôt :)",
                validation.getUser().getName(),
                validation.getCode()
        );

        mailMessage.setText(text);
        javaMailSender.send(mailMessage);
    }
}
