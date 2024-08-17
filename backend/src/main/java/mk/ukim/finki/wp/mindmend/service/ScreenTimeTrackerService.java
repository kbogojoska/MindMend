package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;

import java.time.LocalTime;
import java.util.List;

public interface ScreenTimeTrackerService {
    List<ScreenTimeTracker> findAllScreenTimeTrackers();
    ScreenTimeTracker findById(Long id);
    ScreenTimeTracker create(LocalTime workTimeStart, LocalTime workTimeEnd, ApplicationUser user);
    ScreenTimeTracker edit(Long id, LocalTime workTimeStart, LocalTime workTimeEnd);
    ScreenTimeTracker delete(Long id, ApplicationUser applicationUser);
    ScreenTimeTracker findByUser(ApplicationUser user);
}
