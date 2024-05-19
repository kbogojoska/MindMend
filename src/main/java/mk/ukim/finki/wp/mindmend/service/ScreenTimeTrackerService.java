package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.DTO.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;

import java.util.List;

public interface ScreenTimeTrackerService {
    List<ScreenTimeTracker> findAllScreenTimeTrackers();
    ScreenTimeTracker findById(Long id);
    ScreenTimeTracker create(ScreenTimeDTO screenTimeDTO);
    ScreenTimeTracker edit(Long id, ScreenTimeDTO screenTimeDTO);
    ScreenTimeTracker delete(Long id);
}
