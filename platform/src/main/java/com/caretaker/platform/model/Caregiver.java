package com.caretaker.platform.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "caregivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Caregiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String pincode;

    // Professional details
    @ElementCollection
    @CollectionTable(name = "caregiver_services", joinColumns = @JoinColumn(name = "caregiver_id"))
    @Column(name = "service")
    private List<String> services;

    private String experience;

    // Payment details
    private Double hourlyRate;
    private String qrCodePath;

    // Link to user account
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Application status
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    // Timestamp
    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
    }

    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}