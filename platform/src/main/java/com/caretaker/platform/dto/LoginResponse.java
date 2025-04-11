// src/main/java/com/caretaker/platform/dto/LoginResponse.java
package com.caretaker.platform.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private boolean isCaretaker;
    
    public LoginResponse(String token, String username, boolean isCaretaker) {
        this.token = token;
        this.username = username;
        this.isCaretaker = isCaretaker;
    }
}