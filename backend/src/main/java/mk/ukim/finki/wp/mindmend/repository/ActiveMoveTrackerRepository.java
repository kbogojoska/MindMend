package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveMoveTrackerRepository extends JpaRepository<ActiveMoveTracker,Long> {
}
