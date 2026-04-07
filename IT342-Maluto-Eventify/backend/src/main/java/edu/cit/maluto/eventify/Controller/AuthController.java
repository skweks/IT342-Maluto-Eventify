package edu.cit.maluto.eventify.controller;

import edu.cit.maluto.eventify.model.User;
import edu.cit.maluto.eventify.model.UserDTO;
import edu.cit.maluto.eventify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Singleton Pattern: Using the bean defined in SecurityConfig
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists.");
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Convert Entity to DTO to hide the password in the response
        return ResponseEntity.ok(convertToDTO(savedUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        return userRepository.findByEmail(body.get("email"))
                .map(user -> {
                    if (passwordEncoder.matches(body.get("password"), user.getPassword())) {
                        return ResponseEntity.ok(convertToDTO(user));
                    }
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password.");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found."));
    }

    // Helper method to map Entity -> DTO
    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getSchoolId(),
                user.getRole());
    }
}