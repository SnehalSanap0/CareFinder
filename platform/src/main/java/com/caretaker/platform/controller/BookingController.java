package com.caretaker.platform.controller;

import com.caretaker.platform.dto.CaregiverApplicationDTO;
import com.caretaker.platform.model.Caregiver;
import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.BookingRepository;
import com.caretaker.platform.repository.UserRepository;
import com.caretaker.platform.security.JwtUtils;
import com.caretaker.platform.service.CaregiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.caretaker.platform.model.BookingStatus;
import com.caretaker.platform.model.Booking;
import com.caretaker.platform.model.BookingStatus;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Long> bookingRequest) {
        try {
            // Get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            // Validate the request
            if (!bookingRequest.containsKey("userId") || !bookingRequest.containsKey("caregiverId")) {
                return ResponseEntity.badRequest().body(Map.of("message", "Missing required fields: userId and caregiverId"));
            }

            Long userId = bookingRequest.get("userId");
            Long caregiverId = bookingRequest.get("caregiverId");

            // Verify the user exists
            if (!userRepository.existsById(userId)) {
                return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
            }

            // Create and save the booking
            Booking booking = new Booking();
            booking.setUserId(userId);
            booking.setCaregiverId(caregiverId);
            booking.setStatus(BookingStatus.PENDING);

            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error creating booking: " + e.getMessage()));
        }
    }

    @GetMapping("/caregiver/{caregiverId}")
    public List<Booking> getRequestsForCaregiver(@PathVariable Long caregiverId) {
        return bookingRepository.findByCaregiverIdAndStatus(caregiverId, BookingStatus.PENDING);
    }

    @PostMapping("/{bookingId}/respond")
    public ResponseEntity<?> respondToRequest(@PathVariable Long bookingId, @RequestParam String response) {
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            booking.setStatus(BookingStatus.valueOf(response.toUpperCase()));
            Booking updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error updating booking: " + e.getMessage()));
        }
    }
}
