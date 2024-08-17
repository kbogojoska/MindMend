package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScreenTimeTrackerRepository extends JpaRepository<ScreenTimeTracker,Long> {
    Optional<ScreenTimeTracker> getScreenTimeTrackerByApplicationUser(ApplicationUser user);

}
