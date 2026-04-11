package edu.cit.maluto.eventify.Controller;

import edu.cit.maluto.eventify.Entity.Event;
import edu.cit.maluto.eventify.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        // Automatically set available slots to match total capacity upon creation
        event.setAvailableSlots(event.getTotalSlots());
        return eventRepository.save(event);
    }

    // --- NEW: Registration Endpoint ---
    @PostMapping("/{id}/register")
    public ResponseEntity<?> registerForEvent(@PathVariable Long id) {
        // Find the event in the database by its ID
        Optional<Event> optionalEvent = eventRepository.findById(id);

        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();

            // Check if there is still room
            if (event.getAvailableSlots() > 0) {
                // Deduct 1 from available slots
                event.setAvailableSlots(event.getAvailableSlots() - 1);
                eventRepository.save(event); // Save the updated event to the database

                return ResponseEntity.ok().body("Successfully registered");
            } else {
                return ResponseEntity.badRequest().body("Event is full");
            }
        }
        return ResponseEntity.notFound().build(); // Event doesn't exist
    }
}