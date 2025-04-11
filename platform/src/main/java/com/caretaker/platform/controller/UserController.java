//package com.caretaker.platform.controller;
//
//import com.caretaker.platform.model.User;
//import com.caretaker.platform.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@CrossOrigin(origins = "*") // Add this to handle CORS
//@RestController
//@RequestMapping("/api/user")
//public class UserController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @GetMapping("/me")
//    public ResponseEntity<?> getCurrentUser() {
//        // Get authenticated user's username
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//
//        // Find user in database
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Create a DTO with only the required fields
//        Map<String, Object> response = new HashMap<>();
//        response.put("id", user.getId());
//        response.put("username", user.getUsername());
//        response.put("email", user.getEmail());
//        response.put("isCaretaker", user.isCaretaker());
//
//        return ResponseEntity.ok(response);
//    }
//}
package com.caretaker.platform.controller;

import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*") // Handles CORS for all origins
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        // Get authenticated user's username
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Debug logging
        System.out.println("Authentication: " + authentication);
        System.out.println("Principal: " + (authentication != null ? authentication.getPrincipal() : "null"));

        // Check if authenticated
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            System.err.println("Unauthenticated access attempt");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        String username = authentication.getName();
        System.out.println("Fetching user data for: " + username);

        try {
            // Find user in database
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

            // Create a DTO with only the required fields
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("isCaretaker", user.isCaretaker());

            System.out.println("Successfully retrieved user data for: " + username);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error retrieving user: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving user: " + e.getMessage());
        }
    }
}