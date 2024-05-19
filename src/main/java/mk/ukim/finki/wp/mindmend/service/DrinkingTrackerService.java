package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.dto.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DrinkingTracker;

import java.util.List;

public interface DrinkingTrackerService {
    List<DrinkingTrackerDTO> findAllDrinkingTrackers();
    DrinkingTrackerDTO findById(Long id);
    DrinkingTracker create(DrinkingTrackerDTO drinkingTrackerDTO);
    DrinkingTracker edit(Long id, DrinkingTrackerDTO drinkingTrackerDTO);
    DrinkingTracker delete(Long id);
}
