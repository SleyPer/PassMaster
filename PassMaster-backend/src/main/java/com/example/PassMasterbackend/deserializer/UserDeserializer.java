package com.example.PassMasterbackend.deserializer;

import com.example.PassMasterbackend.entity.User;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

public class UserDeserializer extends StdDeserializer<User> {

    public UserDeserializer() {
        this(null);
    }

    public UserDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public User deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);

        String firstName = node.get("firstName").asText();
        String lastName = node.get("lastName").asText();
        String mail = node.get("mail").asText();
        String pass = node.get("pass").asText();

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setMail(mail);
        user.setPass(pass);

        return user;
    }
}

