package edu.cit.maluto.eventify.Repository;

import edu.cit.maluto.eventify.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}