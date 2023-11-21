package com.example.PassMasterbackend.deserializer;

import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.entity.User;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class RoomDeserializer extends StdDeserializer<Room> {

    public RoomDeserializer() {
        this(null);
    }

    public RoomDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Room deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);

        String id = node.get("id").asText();
        String name = node.get("name").asText();

        List<User> users = new ArrayList<>();
        JsonNode usersNode = node.get("users");
        if (usersNode != null && usersNode.isArray()) {
            for (JsonNode userNode : usersNode) {
                User user = new User();
                user.setId(userNode.get("id").asLong());
                user.setFirstName(userNode.get("firstName").asText());
                user.setLastName(userNode.get("lastName").asText());
                user.setMail(userNode.get("mail").asText());

                users.add(user);
            }
        }

        List<String> sessionIds = null;
        if (node.has("sessionIds")) {
            sessionIds = Collections.singletonList(node.get("sessionIds").asText());
        }

        return new Room(id, name, users, sessionIds);
    }
}
