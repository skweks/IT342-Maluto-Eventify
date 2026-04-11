package edu.cit.maluto.eventify.Controller;

// FIX: Changed .model to .Entity to match your User class package
import edu.cit.maluto.eventify.Entity.User;
import edu.cit.maluto.eventify.Repository.UserRepository;
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

    // Security: BCrypt for Confidentiality (Hashing)
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Integrity: Prevent duplicate email registration
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists.");
        }

        // Confidentiality: Secure password storage (Hashed) [cite: 120, 217]
        user.setPassword(encoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        // Availability: Verification logic
        return userRepository.findByEmail(email)
                .map(user -> {
                    // Verifying credentials using the database
                    if (encoder.matches(password, user.getPassword())) {
                        return ResponseEntity.ok(user);
                    }
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password.");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Account not found. Please register first."));
    }
}