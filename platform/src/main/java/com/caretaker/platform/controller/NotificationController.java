package com.caretaker.platform.controller;

import com.caretaker.platform.model.Notification;
import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.NotificationRepository;
import com.caretaker.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getNotifications() {
        try {
            System.out.println("Starting getNotifications endpoint");
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authentication object: " + (authentication != null ? "present" : "null"));
            
            if (authentication == null || !authentication.isAuthenticated()) {
                System.out.println("User not authenticated");
                return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
            }
            
            String username = authentication.getName();
            System.out.println("Fetching notifications for user: " + username);
            
            // Get user ID from username
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("User not found with username: " + username);
                    return new RuntimeException("User not found with username: " + username);
                });
            
            System.out.println("Found user with ID: " + user.getId());
            
            List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
            System.out.println("Found " + notifications.size() + " notifications");
            
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            System.err.println("Error in getNotifications: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "message", "Error fetching notifications",
                "error", e.getMessage(),
                "details", e.getClass().getName()
            ));
        }
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        try {
            System.out.println("Starting markAsRead endpoint for notification ID: " + id);
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                System.out.println("User not authenticated in markAsRead");
                return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
            }

            String username = authentication.getName();
            System.out.println("Marking notification as read for user: " + username);
            
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("User not found with username: " + username);
                    return new RuntimeException("User not found with username: " + username);
                });

            Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> {
                    System.out.println("Notification not found with ID: " + id);
                    return new RuntimeException("Notification not found");
                });

            // Check if the notification belongs to the authenticated user
            if (!notification.getUserId().equals(user.getId())) {
                System.out.println("Unauthorized access attempt for notification ID: " + id);
                return ResponseEntity.status(403).body(Map.of(
                    "message", "You are not authorized to mark this notification as read"
                ));
            }

            notification.setRead(true);
            notificationRepository.save(notification);
            System.out.println("Successfully marked notification as read");
            
            return ResponseEntity.ok(Map.of("message", "Notification marked as read"));
        } catch (Exception e) {
            System.err.println("Error in markAsRead: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "message", "Error marking notification as read",
                "error", e.getMessage(),
                "details", e.getClass().getName()
            ));
        }
    }
} 