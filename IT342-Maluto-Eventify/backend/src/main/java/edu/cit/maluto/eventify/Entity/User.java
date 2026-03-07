package edu.cit.maluto.eventify.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email; // [cite: 117]

    private String password; // Will be stored as a Hash [cite: 120]

    private String schoolId; // Student/Employee ID [cite: 437]

    private String role; // STUDENT or ORGANIZER [cite: 91]
}