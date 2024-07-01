package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.habits.SleepTracker;

import java.time.LocalTime;
import java.util.List;

public interface SleepTrackerService {
    List<SleepTracker> findAllSleepTrackers();
    SleepTracker findById(Long Id);
    SleepTracker create(Integer recommendedSleepTime, LocalTime wakeUpTime, LocalTime bedTime);
    SleepTracker edit(Long Id, Integer recommendedSleepTime, LocalTime wakeUpTime, LocalTime bedTime);
    SleepTracker delete(Long Id);
}
