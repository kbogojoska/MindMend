package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    public List<ApplicationUser> findAllByEmail(String email);
    public Optional<ApplicationUser> findByUsername(String username);
}
