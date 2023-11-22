package com.example.PassMasterbackend.deserializer;

import com.example.PassMasterbackend.entity.Room;
import com.example.PassMasterbackend.entity.User;
import com.example.PassMasterbackend.entity.UserRoomUnreadMessages;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

        Long id = node.has("id") ? node.get("id").asLong() : null;
        String firstName = node.get("firstName").asText();
        String lastName = node.get("lastName").asText();
        String mail = node.get("mail").asText();
        String pass = node.get("pass").asText();
        String color = node.has("color") ? node.get("color").asText() : null;

        User user = new User();
        if (id != null) user.setId(id);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setMail(mail);
        user.setPass(pass);
        user.setColor(color);

        if (node.has("userRoomUnreadMessages")) {
            List<UserRoomUnreadMessages> userRoomUnreadMessages = new ArrayList<>();
            JsonNode userRoomUnreadMessagesNode = node.get("userRoomUnreadMessages");
            if (userRoomUnreadMessagesNode.isArray()) {
                for (JsonNode messageNode : userRoomUnreadMessagesNode) {
                    Room room = ctxt.readValue(messageNode.get("room").traverse(), Room.class);
                    int unreadMessages = messageNode.get("unreadMessages").asInt();
                    UserRoomUnreadMessages userRoomUnreadMessage = new UserRoomUnreadMessages();
                    userRoomUnreadMessage.setRoom(room);
                    userRoomUnreadMessage.setUnreadMessages(unreadMessages);
                    userRoomUnreadMessages.add(userRoomUnreadMessage);
                }
            }
            user.setUserRoomUnreadMessages(userRoomUnreadMessages);
        }

        return user;
    }
}

