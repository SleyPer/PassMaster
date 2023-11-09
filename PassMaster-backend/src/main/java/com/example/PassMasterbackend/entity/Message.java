package com.example.PassMasterbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private User sender;
    private Long senderId;
    private String content;
    private Date timestamp;
}

