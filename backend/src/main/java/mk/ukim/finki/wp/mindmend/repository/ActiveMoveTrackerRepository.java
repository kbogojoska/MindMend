package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActiveMoveTrackerRepository extends JpaRepository<ActiveMoveTracker,Long> {
    Optional<ActiveMoveTracker> getActiveMoveTrackerByUser(ApplicationUser user);

}
