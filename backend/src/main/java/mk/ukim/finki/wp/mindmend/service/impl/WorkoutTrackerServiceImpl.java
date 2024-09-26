package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.WorkoutTrackerAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.WorkoutTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.WorkoutTracker;
import mk.ukim.finki.wp.mindmend.repository.WorkoutTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.WorkoutTrackerService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class WorkoutTrackerServiceImpl implements WorkoutTrackerService {

    private final WorkoutTrackerRepository workoutTrackerRepository;

    public WorkoutTrackerServiceImpl(WorkoutTrackerRepository workoutTrackerRepository) {
        this.workoutTrackerRepository = workoutTrackerRepository;
    }

    @Override
    public List<WorkoutTracker> findAllWorkoutTrackers() {
        return workoutTrackerRepository.findAll();
    }

    @Override
    public WorkoutTracker findById(Long Id) {
        return workoutTrackerRepository.findById(Id).orElseThrow(WorkoutTrackerNotFoundException::new);
    }

    @Override
    public WorkoutTracker create(Integer recommendedDurationTimeInMinutes,
                                 LocalTime startWorkoutTime,
                                 LocalTime endWorkoutTime,
                                 ApplicationUser user) {
        if (workoutTrackerRepository.getWorkoutTrackerByApplicationUser(user).isPresent()) {
            throw new WorkoutTrackerAlreadyExistsException();
        }
        return (recommendedDurationTimeInMinutes == null && startWorkoutTime == null && endWorkoutTime == null) ?
                workoutTrackerRepository.save(new WorkoutTracker(user)) :
                (recommendedDurationTimeInMinutes == null ? workoutTrackerRepository.save(new WorkoutTracker(user, startWorkoutTime, endWorkoutTime)) :
                        workoutTrackerRepository.save(new WorkoutTracker(user, recommendedDurationTimeInMinutes, startWorkoutTime, endWorkoutTime)));

    }

    @Override
    public WorkoutTracker edit(Long Id, Integer recommendedDurationTimeInMinutes, LocalTime startWorkoutTime, LocalTime endWorkoutTime) {
        WorkoutTracker workoutTracker = findById(Id);
        if (recommendedDurationTimeInMinutes != null)
            workoutTracker.setRecommendedDurationTimeInMinutes(recommendedDurationTimeInMinutes);
        workoutTracker.setStartWorkoutTime(startWorkoutTime);
        workoutTracker.setEndWorkoutTime(endWorkoutTime);
        return workoutTrackerRepository.save(workoutTracker);
    }

    @Override
    public WorkoutTracker delete(Long Id, ApplicationUser applicationUser) {
        WorkoutTracker workoutTracker = findById(Id);
        workoutTrackerRepository.delete(workoutTracker);
        create(null, null, null, applicationUser);
        return workoutTracker;
    }

    @Override
    public WorkoutTracker findByUser(ApplicationUser user) {
        return workoutTrackerRepository.getWorkoutTrackerByApplicationUser(user).orElseThrow(WorkoutTrackerNotFoundException::new);
    }
}
