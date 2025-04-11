// src/main/java/com/caretaker/platform/service/AuthService.java
package com.caretaker.platform.service;

import com.caretaker.platform.dto.LoginRequest;
import com.caretaker.platform.dto.LoginResponse;
import com.caretaker.platform.dto.SignupRequest;
import com.caretaker.platform.exception.UserAlreadyExistsException;
import com.caretaker.platform.model.User;
import com.caretaker.platform.repository.UserRepository;
import com.caretaker.platform.security.JwtUtils;
import com.caretaker.platform.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return new LoginResponse(jwt, userDetails.getUsername(), userDetails.isCaretaker());
    }

//    public User registerUser(SignupRequest signUpRequest) throws UserAlreadyExistsException {
//        if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
//            throw new UserAlreadyExistsException("Username is already taken!");
//        }
//
//        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
//            throw new UserAlreadyExistsException("Email is already in use!");
//        }
//
//        // Create new user's account
//        User user = new User(signUpRequest.getUsername(),
//                            signUpRequest.getEmail(),
//                            passwordEncoder.encode(signUpRequest.getPassword()),
//                            signUpRequest.isCaretaker());
//
//        // Set default role
////        if (signUpRequest.isCaretaker()) {
////            user.getRoles().add("ROLE_CARETAKER");
////        } else {
////            user.getRoles().add("ROLE_USER");
////        }
//        if (signUpRequest.isCaretaker()) {
//            user.getRoles().add("ROLE_CARETAKER"); // Must start with "ROLE_"
//        } else {
//            user.getRoles().add("ROLE_USER");
//        }
//
//        return userRepository.save(user);
//    }
public User registerUser(SignupRequest signUpRequest) throws UserAlreadyExistsException {
    if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
        throw new UserAlreadyExistsException("Username is already taken!");
    }

    if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
        throw new UserAlreadyExistsException("Email is already in use!");
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            passwordEncoder.encode(signUpRequest.getPassword()),
            signUpRequest.isCaretaker());

    // Clear any existing roles and add the appropriate one
    user.getRoles().clear(); // Ensure we start with a clean set

    if (signUpRequest.isCaretaker()) {
        user.getRoles().add("ROLE_CARETAKER"); // Note: Make sure this matches your security configuration
    } else {
        user.getRoles().add("ROLE_USER");
    }

    return userRepository.save(user);
}
}