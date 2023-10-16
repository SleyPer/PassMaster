package com.example.PassMasterbackend.dto;

import java.util.Date;

public interface ChestDTO {
    Long getId();
    Date getCreationDate();
    String getDescription();
    String getLink();
    String getUsername();
    String getPassword();
}
