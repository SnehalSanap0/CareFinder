package com.caretaker.platform.dto;

import lombok.Data;

import java.util.List;

@Data
public class CaregiverApplicationDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String pincode;
    private List<String> services;
    private String experience;
    private Double hourlyRate;
}