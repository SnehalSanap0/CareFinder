package com.caretaker.platform.controller;

import com.caretaker.platform.dto.CaregiverApplicationDTO;
import com.caretaker.platform.model.Caregiver;
import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.BookingRepository;
import com.caretaker.platform.repository.UserRepository;
import com.caretaker.platform.repository.CaregiverRepository;
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
import com.caretaker.platform.model.Notification;
import com.caretaker.platform.repository.NotificationRepository;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CaregiverRepository caregiverRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Long> bookingRequest) {
        try {
            // Get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

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

            // Get the caregiver entity
            Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new RuntimeException("Caregiver not found"));

            // Create and save the booking
            Booking booking = new Booking();
            booking.setUserId(userId);
            booking.setCaregiverId(caregiverId); // Store the caregiver ID directly
            booking.setStatus(BookingStatus.PENDING);

            Booking savedBooking = bookingRepository.save(booking);

            // Create notification for the caregiver
            Notification notification = new Notification();
            notification.setUserId(caregiver.getUser().getId());
            notification.setMessage("New booking request received from " + currentUser.getUsername());
            notification.setType("BOOKING_REQUEST");
            notification.setCreatedAt(LocalDateTime.now());
            notification.setRead(false);
            notificationRepository.save(notification);

            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error creating booking: " + e.getMessage()));
        }
    }

    @GetMapping("/caregiver/{caregiverId}")
    public List<Booking> getRequestsForCaregiver(@PathVariable Long caregiverId) {
        return bookingRepository.findByCaregiverIdAndStatus(caregiverId, BookingStatus.PENDING);
    }

    @PutMapping("/{bookingId}/accept")
    public ResponseEntity<?> acceptBooking(@PathVariable Long bookingId) {
        try {
            // Get the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
            }
            
            String username = authentication.getName();
            User currentUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Find the booking
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            // Get the caregiver for the current user
            Caregiver caregiver = caregiverRepository.findByUser(currentUser)
                    .orElseThrow(() -> new RuntimeException("Caregiver not found for current user"));

            // Verify authorization
            if (!booking.getCaregiverId().equals(caregiver.getId())) {
                return ResponseEntity.status(403).body(Map.of(
                        "message", "You are not authorized to accept this booking",
                        "details", Map.of(
                                "currentUserId", currentUser.getId(),
                                "caregiverId", booking.getCaregiverId(),
                                "bookingId", booking.getId()
                        )
                ));
            }

            // Update booking status
            booking.setStatus(BookingStatus.ACCEPTED);
            bookingRepository.save(booking);

            // Create notification with contact details
            Notification notification = new Notification();
            notification.setUserId(booking.getUserId());
            notification.setMessage("Your booking request has been accepted by " + currentUser.getUsername() + 
                                 "\nContact Details:" +
                                 "\nName: " + currentUser.getUsername() +
                                 "\nEmail: " + currentUser.getEmail() +
                                 "\nPhone: " + caregiver.getPhone() +
                                 "\nAddress: " + caregiver.getAddress() + ", " + caregiver.getCity() + ", " + caregiver.getPincode() +
                                 "\nExperience: " + caregiver.getExperience() +
                                 "\nHourly Rate: ₹" + caregiver.getHourlyRate() +
                                 "\nServices: " + String.join(", ", caregiver.getServices()));
            notification.setType("BOOKING_ACCEPTED");
            notification.setCreatedAt(LocalDateTime.now());
            notification.setRead(false);
            notificationRepository.save(notification);

            return ResponseEntity.ok(Map.of("message", "Booking accepted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "message", "Error accepting booking",
                    "error", e.getMessage()
            ));
        }
    }

    @PutMapping("/{bookingId}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable Long bookingId, @RequestBody Map<String, String> request) {
        try {
            Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

            // Verify the current user is the caregiver for this booking
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Get the caregiver for the current user
            Caregiver caregiver = caregiverRepository.findByUser(currentUser)
                .orElseThrow(() -> new RuntimeException("Caregiver not found for current user"));

            if (!booking.getCaregiverId().equals(caregiver.getId())) {
                return ResponseEntity.status(403).body(Map.of(
                    "message", "You are not authorized to reject this booking",
                    "details", Map.of(
                        "currentUserId", currentUser.getId(),
                        "caregiverId", booking.getCaregiverId(),
                        "bookingId", booking.getId()
                    )
                ));
            }

            String reason = request.get("reason");
            if (reason == null || reason.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Reason for rejection is required"));
            }

            booking.setStatus(BookingStatus.REJECTED);
            booking.setRejectionReason(reason);
            bookingRepository.save(booking);

            // Create notification for the user
            Notification notification = new Notification();
            notification.setUserId(booking.getUserId());
            notification.setMessage("Your booking request has been declined by " + currentUser.getUsername() + ". Reason: " + reason);
            notification.setType("BOOKING_REJECTED");
            notification.setCreatedAt(LocalDateTime.now());
            notification.setRead(false);
            notificationRepository.save(notification);

            return ResponseEntity.ok(Map.of("message", "Booking rejected successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error rejecting booking: " + e.getMessage()));
        }
    }
}
