package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SocialSphereRepository extends JpaRepository<SocialSphere, Long> {
    Optional<SocialSphere> getSocialSphereByApplicationUser(ApplicationUser user);
}
