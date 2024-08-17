package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.DrinkingMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.model.exceptions.DrinkingTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.repository.DrinkingTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.DrinkingTrackerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrinkingTrackerImpl implements DrinkingTrackerService {
    private final DrinkingTrackerRepository drinkingRepository;

    @Override
    public List<DrinkingTracker> findAllDrinkingTrackers() {
        return drinkingRepository.findAll();
    }

    @Override
    public DrinkingTracker findById(Long id) {
        return drinkingRepository.findById(id).orElseThrow(DrinkingTrackerNotFoundException::new);
    }

    @Override
    public DrinkingTracker create(Integer numOfDrinks, Integer maxDrinks, ApplicationUser user) {
        if (drinkingRepository.getDrinkingTrackerByApplicationUser(user).isPresent()) {
            throw new DrinkingTrackerNotFoundException();
        }
        return (numOfDrinks == null && maxDrinks == null) ?
                drinkingRepository.save(new DrinkingTracker(user)) :
                drinkingRepository.save(new DrinkingTracker(numOfDrinks, maxDrinks, user));
    }

    @Override
    public DrinkingTracker edit(Long id,Integer numOfDrinks, Integer maxDrinks) {
        DrinkingTracker drinkingTracker=drinkingRepository.findById(id).orElseThrow(DrinkingTrackerNotFoundException::new);
        drinkingTracker.setNumOfDrinks(numOfDrinks);
        if(maxDrinks!=null)
            drinkingTracker.setMaxDrinks(maxDrinks);
        return drinkingRepository.save(drinkingTracker);
    }

    @Override
    public DrinkingTracker delete(Long id, ApplicationUser applicationUser) {
        DrinkingTracker drinkingTracker=drinkingRepository.findById(id).orElseThrow(DrinkingTrackerNotFoundException::new);
        drinkingRepository.delete(drinkingTracker);
        create(null, null, applicationUser);
        return drinkingTracker;
    }

    @Override
    public DrinkingTracker findByUser(ApplicationUser user) {
        return drinkingRepository.getDrinkingTrackerByApplicationUser(user).orElseThrow(DrinkingTrackerNotFoundException::new);
    }
}
