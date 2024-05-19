package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.DTO.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;

import java.util.List;

public interface DrinkingTrackerService {
    List<DrinkingTracker> findAllDrinkingTrackers();
    DrinkingTracker findById(Long id);
    DrinkingTracker create(DrinkingTrackerDTO drinkingTrackerDTO);
    DrinkingTracker edit(Long id, DrinkingTrackerDTO drinkingTrackerDTO);
    DrinkingTracker delete(Long id);
}
