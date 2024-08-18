package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.*;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.habits.SleepTracker;
import mk.ukim.finki.wp.mindmend.model.habits.SmokingTracker;
import mk.ukim.finki.wp.mindmend.repository.SleepTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.SleepTrackerService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class SleepTrackerImpl implements SleepTrackerService {

    private final SleepTrackerRepository sleepTrackerRepository;

    public SleepTrackerImpl(SleepTrackerRepository sleepTrackerRepository) {
        this.sleepTrackerRepository = sleepTrackerRepository;
    }

    @Override
    public List<SleepTracker> findAllSleepTrackers() {
        return sleepTrackerRepository.findAll();
    }

    @Override
    public SleepTracker findById(Long Id) {
        return sleepTrackerRepository.findById(Id).orElseThrow(SleepTrackerNotFoundException::new);
    }

    @Override
    public SleepTracker create(Integer recommendedSleepTime,
                               LocalTime wakeUpTime,
                               LocalTime bedTime,
                               ApplicationUser user) {
        if (sleepTrackerRepository.getSleepTrackerByApplicationUser(user).isPresent()) {
            throw new SleepTrackerAlreadyExistsException();
        }
        return (recommendedSleepTime == null && wakeUpTime == null && bedTime == null) ?
                sleepTrackerRepository.save(new SleepTracker(user)) :
                (recommendedSleepTime == null ? sleepTrackerRepository.save(new SleepTracker(user, wakeUpTime, bedTime)) :
                        sleepTrackerRepository.save(new SleepTracker(user, recommendedSleepTime, wakeUpTime, bedTime)));
    }

    @Override
    public SleepTracker edit(Long Id, Integer recommendedSleepTime, LocalTime wakeUpTime, LocalTime bedTime) {
        SleepTracker sleepTracker = findById(Id);
        if (recommendedSleepTime != null)
            sleepTracker.setRecommendedSleepTime(recommendedSleepTime);
        sleepTracker.setWakeUpTime(wakeUpTime);
        sleepTracker.setBedTime(bedTime);
        return sleepTrackerRepository.save(sleepTracker);
    }

    @Override
    public SleepTracker delete(Long Id, ApplicationUser applicationUser) {
        SleepTracker sleepTracker = findById(Id);
        sleepTrackerRepository.delete(sleepTracker);
        create(null, null, null, applicationUser);
        return sleepTracker;
    }

    @Override
    public SleepTracker findByUser(ApplicationUser user) {
        return sleepTrackerRepository.getSleepTrackerByApplicationUser(user).orElseThrow(SleepTrackerNotFoundException::new);
    }
}
