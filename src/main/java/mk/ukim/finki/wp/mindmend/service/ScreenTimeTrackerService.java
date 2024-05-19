package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.dto.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.ScreenTimeTracker;
import org.springframework.cglib.core.Local;

import java.time.LocalTime;
import java.util.List;

public interface ScreenTimeTrackerService {
    List<ScreenTimeDTO> findAllScreenTimeTrackers();
    ScreenTimeDTO findById(Long id);
    ScreenTimeTracker create(ScreenTimeDTO screenTimeDTO);
    ScreenTimeTracker edit(Long id, ScreenTimeDTO screenTimeDTO);
    ScreenTimeTracker delete(Long id);
}
