package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.dto.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.SmokingMapper;
import mk.ukim.finki.wp.mindmend.model.SmokingTracker;

import java.util.List;

public interface SmokingTrackerService {
    List<SmokingTrackerDTO> findAllSmokingTrackers();
    SmokingTrackerDTO findById(Long id);
    SmokingTracker create(SmokingTrackerDTO smokingTrackerDTO);
    SmokingTracker edit(Long id, SmokingTrackerDTO smokingTrackerDTO);
    SmokingTracker delete(Long id);
}
