package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.DTO.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;

import java.util.List;

public interface ActiveMoveTrackerService {
    List<ActiveMoveTracker> findAllMoveTrackers();

    ActiveMoveTracker findById(Long id);

    ActiveMoveTracker create(Integer dailySteps);

    ActiveMoveTracker edit(Long id, Integer dailySteps);

    ActiveMoveTracker delete(Long id);

}
