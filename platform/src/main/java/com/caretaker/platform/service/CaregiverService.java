package com.caretaker.platform.service;

import com.caretaker.platform.model.Caregiver;
import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.CaregiverRepository;
import com.caretaker.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class CaregiverService {

    @Autowired
    private CaregiverRepository caregiverRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public Caregiver createCaregiverApplication(Caregiver caregiver, User user, MultipartFile qrCodeFile) throws IOException {
        // Check if user already has an application
        if (caregiverRepository.existsByUser(user)) {
            throw new IllegalStateException("User already has a caregiver application");
        }

        // Set the user for this caregiver
        caregiver.setUser(user);

        // Store QR code file if provided
        if (qrCodeFile != null && !qrCodeFile.isEmpty()) {
            String qrCodePath = fileStorageService.storeFile(qrCodeFile, "qrcodes");
            caregiver.setQrCodePath(qrCodePath);
        }

        // Save and return the caregiver entity
        return caregiverRepository.save(caregiver);
    }

    public Caregiver getCaregiverByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return caregiverRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("No caregiver application found for user: " + username));
    }

    public Optional<Caregiver> getCaregiverByUser(User user) {
        return caregiverRepository.findByUser(user);
    }

    public Caregiver updateCaregiverApplication(Caregiver updatedCaregiver, User user, MultipartFile qrCodeFile) throws IOException {
        // Find existing application
        Caregiver existingCaregiver = caregiverRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("No caregiver application found for this user"));

        // Update fields
        existingCaregiver.setFirstName(updatedCaregiver.getFirstName());
        existingCaregiver.setLastName(updatedCaregiver.getLastName());
        existingCaregiver.setEmail(updatedCaregiver.getEmail());
        existingCaregiver.setPhone(updatedCaregiver.getPhone());
        existingCaregiver.setAddress(updatedCaregiver.getAddress());
        existingCaregiver.setCity(updatedCaregiver.getCity());
        existingCaregiver.setPincode(updatedCaregiver.getPincode());
        existingCaregiver.setServices(updatedCaregiver.getServices());
        existingCaregiver.setExperience(updatedCaregiver.getExperience());
        existingCaregiver.setHourlyRate(updatedCaregiver.getHourlyRate());

        // Update QR code if provided
        if (qrCodeFile != null && !qrCodeFile.isEmpty()) {
            String qrCodePath = fileStorageService.storeFile(qrCodeFile, "qrcodes");
            existingCaregiver.setQrCodePath(qrCodePath);
        }

        // Save and return updated entity
        return caregiverRepository.save(existingCaregiver);
    }
}