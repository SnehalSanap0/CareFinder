package com.caretaker.platform.dto;

import java.util.List;

public class LoginResponse {
    private String token;
    private String username;
    private boolean isCaretaker;
    private List<String> roles;
    private Long id;  // Add user ID field

    public LoginResponse(String token, String username, boolean isCaretaker, List<String> roles, Long id) {
        this.token = token;
        this.username = username;
        this.isCaretaker = isCaretaker;
        this.roles = roles;
        this.id = id;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isCaretaker() {
        return isCaretaker;
    }

    public void setCaretaker(boolean caretaker) {
        isCaretaker = caretaker;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}