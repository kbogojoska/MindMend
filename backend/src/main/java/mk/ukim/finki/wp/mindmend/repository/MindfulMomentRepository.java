package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.MindfulMoment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MindfulMomentRepository extends JpaRepository<MindfulMoment, Long> {
    Optional<MindfulMoment> getMindfulMomentsByApplicationUser(ApplicationUser user);

}
