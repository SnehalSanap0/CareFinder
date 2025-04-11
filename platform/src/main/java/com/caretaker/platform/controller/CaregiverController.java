package com.caretaker.platform.controller;

import com.caretaker.platform.dto.CaregiverApplicationDTO;
import com.caretaker.platform.model.Caregiver;
import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.UserRepository;
import com.caretaker.platform.security.JwtUtils;
import com.caretaker.platform.service.CaregiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/caregiver")
public class CaregiverController {

    @Autowired
    private CaregiverService caregiverService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/apply")
    public ResponseEntity<?> applyAsCaregiver(
            @RequestHeader("Authorization") String token,
            @RequestPart("application") CaregiverApplicationDTO applicationDTO,
            @RequestPart(value = "qrCode", required = false) MultipartFile qrCodeFile) {

        try {
            // Extract username from JWT token
            String username = jwtUtils.getUserNameFromJwtToken(token.substring(7));

            // Find user
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Create caregiver entity from DTO
            Caregiver caregiver = new Caregiver();
            caregiver.setFirstName(applicationDTO.getFirstName());
            caregiver.setLastName(applicationDTO.getLastName());
            caregiver.setEmail(applicationDTO.getEmail());
            caregiver.setPhone(applicationDTO.getPhone());
            caregiver.setAddress(applicationDTO.getAddress());
            caregiver.setCity(applicationDTO.getCity());
            caregiver.setPincode(applicationDTO.getPincode());
            caregiver.setServices(applicationDTO.getServices());
            caregiver.setExperience(applicationDTO.getExperience());
            caregiver.setHourlyRate(applicationDTO.getHourlyRate());

            // Save caregiver application
            Caregiver savedCaregiver = caregiverService.createCaregiverApplication(caregiver, user, qrCodeFile);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Application submitted successfully");
            response.put("applicationId", savedCaregiver.getId());
            response.put("status", savedCaregiver.getStatus());

            return ResponseEntity.ok(response);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error processing file upload: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/application")
    public ResponseEntity<?> getMyApplication(@RequestHeader("Authorization") String token) {
        try {
            // Extract username from JWT token
            String username = jwtUtils.getUserNameFromJwtToken(token.substring(7));

            // Get caregiver application
            Caregiver caregiver = caregiverService.getCaregiverByUsername(username);

            return ResponseEntity.ok(caregiver);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateApplication(
            @RequestHeader("Authorization") String token,
            @RequestPart("application") CaregiverApplicationDTO applicationDTO,
            @RequestPart(value = "qrCode", required = false) MultipartFile qrCodeFile) {

        try {
            // Extract username from JWT token
            String username = jwtUtils.getUserNameFromJwtToken(token.substring(7));

            // Find user
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Create caregiver entity from DTO
            Caregiver updatedCaregiver = new Caregiver();
            updatedCaregiver.setFirstName(applicationDTO.getFirstName());
            updatedCaregiver.setLastName(applicationDTO.getLastName());
            updatedCaregiver.setEmail(applicationDTO.getEmail());
            updatedCaregiver.setPhone(applicationDTO.getPhone());
            updatedCaregiver.setAddress(applicationDTO.getAddress());
            updatedCaregiver.setCity(applicationDTO.getCity());
            updatedCaregiver.setPincode(applicationDTO.getPincode());
            updatedCaregiver.setServices(applicationDTO.getServices());
            updatedCaregiver.setExperience(applicationDTO.getExperience());
            updatedCaregiver.setHourlyRate(applicationDTO.getHourlyRate());

            // Update application
            Caregiver savedCaregiver = caregiverService.updateCaregiverApplication(updatedCaregiver, user, qrCodeFile);

            return ResponseEntity.ok(Map.of(
                    "message", "Application updated successfully",
                    "applicationId", savedCaregiver.getId(),
                    "status", savedCaregiver.getStatus()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: " + e.getMessage()));
        }
    }
}