package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DrinkingTrackerRepository extends JpaRepository<DrinkingTracker,Long> {
    Optional<DrinkingTracker> getDrinkingTrackerByApplicationUser(ApplicationUser user);
}
