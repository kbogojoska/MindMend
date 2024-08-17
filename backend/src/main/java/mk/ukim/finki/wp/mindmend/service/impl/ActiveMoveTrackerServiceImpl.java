package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.ActiveMoveMapper;
import mk.ukim.finki.wp.mindmend.model.exceptions.ActiveMoveTrackerAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.ActiveMoveTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.repository.ActiveMoveTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ActiveMoveTrackerService;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActiveMoveTrackerServiceImpl implements ActiveMoveTrackerService {
    private final ActiveMoveTrackerRepository activeMoveTrackerRepository;

    @Override
    public List<ActiveMoveTracker> findAllMoveTrackers() {
//        return ActiveMoveMapper.MapToListViewModel(this.activeMoveTrackerRepository.findAll());
        return activeMoveTrackerRepository.findAll();
    }

    @Override
    public ActiveMoveTracker findById(Long id) {
//        return ActiveMoveMapper.MapToViewModel(this.activeMoveTrackerRepository.findById(id).orElseThrow(ActiveMoveTrackerNotFoundException::new));
        return this.activeMoveTrackerRepository.findById(id).orElseThrow(ActiveMoveTrackerNotFoundException::new);
    }

    @Override
    public ActiveMoveTracker create(Integer dailySteps, ApplicationUser user) {
        if (activeMoveTrackerRepository.getActiveMoveTrackerByUser(user).isPresent()) {
            throw new ActiveMoveTrackerAlreadyExistsException();
        }
        if (dailySteps != null)
            return this.activeMoveTrackerRepository.save(new ActiveMoveTracker(user,dailySteps));
        return this.activeMoveTrackerRepository.save(new ActiveMoveTracker(user));
    }

    @Override
    public ActiveMoveTracker edit(Long id, Integer dailySteps) {
        ActiveMoveTracker tracker = activeMoveTrackerRepository.findById(id).
                orElseThrow(ActiveMoveTrackerNotFoundException::new);
        tracker.setDailyStepsGoal(dailySteps);
        return activeMoveTrackerRepository.save(tracker);
    }

    @Override
    public ActiveMoveTracker delete(Long id, ApplicationUser applicationUser) {
        ActiveMoveTracker tracker = activeMoveTrackerRepository.findById(id).
                orElseThrow(ActiveMoveTrackerNotFoundException::new);
        this.activeMoveTrackerRepository.delete(tracker);
        create(null, applicationUser);
        return tracker;
    }

    @Override
    public ActiveMoveTracker findByUser(ApplicationUser user) {
        return activeMoveTrackerRepository.getActiveMoveTrackerByUser(user).orElseThrow(ActiveMoveTrackerNotFoundException::new);
    }
}
