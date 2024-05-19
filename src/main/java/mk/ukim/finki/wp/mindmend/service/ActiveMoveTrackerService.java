package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.dto.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.ActiveMoveTracker;

import java.util.List;

public interface ActiveMoveTrackerService {
    List<ActiveMoveTrackerDTO> findAllMoveTrackers();

    ActiveMoveTrackerDTO findById(Long id);

    ActiveMoveTracker create(ActiveMoveTrackerDTO activeMoveTrackerDTO);

    ActiveMoveTracker edit(Long id, ActiveMoveTrackerDTO activeMoveTrackerDTO);

    ActiveMoveTracker delete(Long id);

}
