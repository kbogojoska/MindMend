package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.WorkoutTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutTrackerRepository extends JpaRepository<WorkoutTracker, Long> {
    Optional<WorkoutTracker> getWorkoutTrackerByApplicationUser(ApplicationUser user);

}
