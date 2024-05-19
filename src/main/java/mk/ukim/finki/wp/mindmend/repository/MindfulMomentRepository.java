package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.MindfulMoment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MindfulMomentRepository extends JpaRepository<MindfulMoment, Long> {
}
