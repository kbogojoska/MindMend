package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialActivityRepository extends JpaRepository<SocialActivity, Long> {
}
