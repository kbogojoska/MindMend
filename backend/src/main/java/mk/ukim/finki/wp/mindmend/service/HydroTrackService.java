package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;

import java.util.List;

public interface HydroTrackService {
    List<HydroTrack> findAllHydroTracks();
    HydroTrack findById(Long Id);
    HydroTrack create(Integer numGlassesOfWater, Integer personalGoal);
    HydroTrack edit(Long Id, Integer numGlassesOfWater, Integer personalGoal);
    HydroTrack delete(Long Id);
}
