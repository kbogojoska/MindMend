package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SleepTracker;
import mk.ukim.finki.wp.mindmend.model.exceptions.SleepTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.SleepTrackerRepository;
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
    public SleepTracker create(Integer recommendedSleepTime, LocalTime wakeUpTime, LocalTime bedTime) {
        SleepTracker sleepTracker;
        ApplicationUser user = new ApplicationUser();
        if (recommendedSleepTime != null) {
            sleepTracker = new SleepTracker(user, recommendedSleepTime, wakeUpTime, bedTime);
        } else {
            sleepTracker = new SleepTracker(user, wakeUpTime, bedTime);
        }
        return sleepTrackerRepository.save(sleepTracker);
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
    public SleepTracker delete(Long Id) {
        SleepTracker sleepTracker = findById(Id);
        sleepTrackerRepository.delete(sleepTracker);
        return sleepTracker;
    }
}
