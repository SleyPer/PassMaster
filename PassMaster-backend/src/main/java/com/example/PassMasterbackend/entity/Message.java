package com.example.PassMasterbackend.entity;

import com.example.PassMasterbackend.deserializer.MessageDeserializer;
import com.example.PassMasterbackend.deserializer.UserDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@JsonDeserialize(using = MessageDeserializer.class)
public class Message {
    private User sender;
    private Long senderId;
    private String content;
    private Date timestamp;
}

