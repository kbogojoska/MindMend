package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.HydroTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HydroTrackRepository extends JpaRepository<HydroTrack, Long> {
}
