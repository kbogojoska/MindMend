package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.SleepTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SleepTrackerRepository extends JpaRepository<SleepTracker, Long> {
    Optional<SleepTracker> getSleepTrackerByApplicationUser(ApplicationUser user);
}
