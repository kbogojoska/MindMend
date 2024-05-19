package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.dto.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.DrinkingMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.model.exceptions.DrinkingTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.DrinkingTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.DrinkingTrackerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrinkingTrackerImpl implements DrinkingTrackerService {
    private final DrinkingTrackerRepository drinkingRepository;
    private final ApplicationUserService userService;

    @Override
    public List<DrinkingTrackerDTO> findAllDrinkingTrackers() {
        return DrinkingMapper.MapToListViewModel(drinkingRepository.findAll());
    }

    @Override
    public DrinkingTrackerDTO findById(Long id) {
        return DrinkingMapper.MapToViewModel(drinkingRepository.findById(id).orElseThrow(DrinkingTrackerNotFoundException::new));
    }

    @Override
    public DrinkingTracker create(DrinkingTrackerDTO drinkingTrackerDTO) {
        ApplicationUser user = this.userService.create("drink", "d", "lkl");
        return drinkingRepository.save(new DrinkingTracker(drinkingTrackerDTO.getNumOfDrinks(), user));
    }

    @Override
    public DrinkingTracker edit(Long id, DrinkingTrackerDTO drinkingTrackerDTO) {
        DrinkingTracker drinkingTracker=drinkingRepository.findById(id).orElseThrow(DrinkingTrackerNotFoundException::new);
        drinkingTracker.setNumOfDrinks(drinkingTrackerDTO.getNumOfDrinks());
        return drinkingRepository.save(drinkingTracker);
    }

    @Override
    public DrinkingTracker delete(Long id) {
        DrinkingTracker drinkingTracker=drinkingRepository.findById(id).orElseThrow(DrinkingTrackerNotFoundException::new);
        drinkingRepository.delete(drinkingTracker);
        return drinkingTracker;
    }
}
