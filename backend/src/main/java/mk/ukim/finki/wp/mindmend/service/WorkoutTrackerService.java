package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.WorkoutTracker;

import java.time.LocalTime;
import java.util.List;

public interface WorkoutTrackerService {
    List<WorkoutTracker> findAllWorkoutTrackers();
    WorkoutTracker findById(Long Id);
    WorkoutTracker create(Integer recommendedDurationTimeInMinutes, LocalTime startWorkoutTime, LocalTime endWorkoutTime, ApplicationUser user);
    WorkoutTracker edit(Long Id, Integer recommendedDurationTimeInMinutes, LocalTime startWorkoutTime, LocalTime endWorkoutTime);
    WorkoutTracker delete(Long Id, ApplicationUser applicationUser);
    WorkoutTracker findByUser(ApplicationUser user);
}
