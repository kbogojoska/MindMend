package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.SocialSphere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialSphereRepository extends JpaRepository<SocialSphere, Long> {
}
