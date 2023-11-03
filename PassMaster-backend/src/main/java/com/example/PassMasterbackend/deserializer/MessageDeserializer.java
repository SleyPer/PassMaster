package com.example.PassMasterbackend.deserializer;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.service.UserService;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class MessageDeserializer extends StdDeserializer<Message> {
    private final UserService userService;

    public MessageDeserializer() {
        this(null);
    }

    public MessageDeserializer(UserService userService) {
        this(null, userService);
    }

    public MessageDeserializer(Class<?> vc, UserService userService) {
        super(vc);
        this.userService = userService;
    }

    @Override
    public Message deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);
        Long senderId = node.get("sender").asLong();
        Long recipientId = node.get("recipient").asLong();
        String content = node.get("content").asText();

        User sender = userService.getUserById(senderId);
        User recipient = userService.getUserById(recipientId);

        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);

        return message;
    }
}

