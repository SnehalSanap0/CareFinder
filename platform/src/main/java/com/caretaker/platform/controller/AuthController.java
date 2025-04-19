//// src/main/java/com/caretaker/platform/controller/AuthController.java
//package com.caretaker.platform.controller;
//
//import com.caretaker.platform.dto.LoginRequest;
//import com.caretaker.platform.dto.LoginResponse;
//import com.caretaker.platform.dto.SignupRequest;
//import com.caretaker.platform.exception.UserAlreadyExistsException;
//import com.caretaker.platform.model.User;
//import com.caretaker.platform.service.AuthService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import jakarta.validation.Valid;
//
////@CrossOrigin(origins = "**", maxAge = 3600)
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//    @Autowired
//    private AuthService authService;
//
//    @PostMapping("/signin")
//    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
//        try {
//            User user = authService.registerUser(signUpRequest);
//            return ResponseEntity.ok("User registered successfully!");
//        } catch (UserAlreadyExistsException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @PostMapping("/signout")
//    public ResponseEntity<?> logoutUser() {
//        // Since we're using JWT, logout is handled client-side by discarding the token
//        return ResponseEntity.ok("Logged out successfully");
//    }
//    @GetMapping("/validate")
//    public ResponseEntity<?> validateToken() {
//        // The fact this is reached means token is valid
//        return ResponseEntity.ok("Token is valid");
//    }
//}
// src/main/java/com/caretaker/platform/controller/AuthController.java
package com.caretaker.platform.controller;

import com.caretaker.platform.dto.LoginRequest;
import com.caretaker.platform.dto.LoginResponse;
import com.caretaker.platform.dto.SignupRequest;
import com.caretaker.platform.exception.UserAlreadyExistsException;
import com.caretaker.platform.model.User;
import com.caretaker.platform.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // No changes needed here as we'll update the LoginResponse and AuthService
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            User user = authService.registerUser(signUpRequest);
            return ResponseEntity.ok("User registered successfully!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        // Since we're using JWT, logout is handled client-side by discarding the token
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        // The fact this is reached means token is valid
        return ResponseEntity.ok("Token is valid");
    }
}