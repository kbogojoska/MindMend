package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;

import java.util.List;

public interface DrinkingTrackerService {
    List<DrinkingTracker> findAllDrinkingTrackers();
    DrinkingTracker findById(Long id);
    DrinkingTracker create(Integer numOfDrinks, Integer maxDrinks, ApplicationUser user);
    DrinkingTracker edit(Long id, Integer numOfDrinks, Integer maxDrinks);
    DrinkingTracker delete(Long id, ApplicationUser applicationUser);
    DrinkingTracker findByUser(ApplicationUser user);
}
