package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.ActiveMoveMapper;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.ActiveMoveTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.ActiveMoveTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ActiveMoveTrackerService;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActiveMoveTrackerServiceImpl implements ActiveMoveTrackerService {
    private final ActiveMoveTrackerRepository activeMoveTrackerRepository;
    private final ApplicationUserService applicationUserService;

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
    public ActiveMoveTracker create(ActiveMoveTrackerDTO activeMoveTrackerDTO) {
        ApplicationUser user=applicationUserService.create("new","147","new@gmail.com");
        if (activeMoveTrackerDTO.getDailySteps() != null)
            return this.activeMoveTrackerRepository.save(new ActiveMoveTracker(user,activeMoveTrackerDTO.getDailySteps()));
        return this.activeMoveTrackerRepository.save(new ActiveMoveTracker(user));
    }

    @Override
    public ActiveMoveTracker edit(Long id, ActiveMoveTrackerDTO activeMoveTrackerDTO) {
        ActiveMoveTracker tracker = activeMoveTrackerRepository.findById(id).
                orElseThrow(ActiveMoveTrackerNotFoundException::new);
        tracker.setDailyStepsGoal(activeMoveTrackerDTO.getDailySteps());
        return activeMoveTrackerRepository.save(tracker);
    }

    @Override
    public ActiveMoveTracker delete(Long id) {
        ActiveMoveTracker tracker = activeMoveTrackerRepository.findById(id).
                orElseThrow(ActiveMoveTrackerNotFoundException::new);
        this.activeMoveTrackerRepository.delete(tracker);
        return tracker;
    }
}
