package com.example.PassMasterbackend.deserializer;

import com.example.PassMasterbackend.entity.Message;
import com.example.PassMasterbackend.entity.User;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.util.Date;

public class MessageDeserializer extends StdDeserializer<Message> {

    public MessageDeserializer() {
        this(null);
    }

    public MessageDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Message deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);

        User sender = null;
        if (node.has("sender")) {
            sender = new UserDeserializer().deserialize(node.get("sender").traverse(), ctxt);
        }

        Long senderId = node.has("senderId") ? node.get("senderId").asLong() : null;
        String content = node.has("content") ? node.get("content").asText() : null;
        Date timestamp = node.has("timestamp") ? new Date(node.get("timestamp").asLong()) : null;

        return new Message(sender, senderId, content, timestamp);
    }
}

