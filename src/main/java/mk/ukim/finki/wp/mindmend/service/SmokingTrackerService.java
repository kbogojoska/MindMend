package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.DTO.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SmokingTracker;

import java.util.List;

public interface SmokingTrackerService {
    List<SmokingTracker> findAllSmokingTrackers();
    SmokingTracker findById(Long id);
    SmokingTracker create(SmokingTrackerDTO smokingTrackerDTO);
    SmokingTracker edit(Long id, SmokingTrackerDTO smokingTrackerDTO);
    SmokingTracker delete(Long id);
}
