package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.SmokingMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.SmokingTracker;
import mk.ukim.finki.wp.mindmend.model.exceptions.SmokingTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.SmokingTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.SmokingTrackerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SmokingTrackerImpl implements SmokingTrackerService {
    private final SmokingTrackerRepository smokingRepository;
    private final ApplicationUserService userService;

    @Override
    public List<SmokingTracker> findAllSmokingTrackers() {
//        return SmokingMapper.MapToListViewModel(smokingRepository.findAll());
        return smokingRepository.findAll();
    }

    @Override
    public SmokingTracker findById(Long id) {
//        return SmokingMapper.MapToViewModel(smokingRepository.findById(id).orElseThrow(SmokingTrackerNotFoundException::new));
        return smokingRepository.findById(id).orElseThrow(SmokingTrackerNotFoundException::new);
    }

    @Override
    public SmokingTracker create(Integer numCigarettes, Integer maxCigarettes) {
        ApplicationUser applicationUser = this.userService.create("smoke", "s", "s#");
        //making sure that it's not the same number as the threshold for cigarettesPerDay
        //or should the user update daily the number of cigarettes and compare it to the threshold
        return this.smokingRepository.save(new SmokingTracker(numCigarettes, maxCigarettes, applicationUser));
    }

    @Override
    public SmokingTracker edit(Long id, Integer numOfCigarettesPerDay, Integer maxCigarettes) {
        SmokingTracker smokingTracker = this.smokingRepository.findById(id).orElseThrow(SmokingTrackerNotFoundException::new);
        smokingTracker.setCigarettesPerDay(numOfCigarettesPerDay);
        if (maxCigarettes != null)
            smokingTracker.setMaxCigarettesPerDay(maxCigarettes);
        return smokingRepository.save(smokingTracker);
    }

    @Override
    public SmokingTracker delete(Long id) {
        SmokingTracker smokingTracker = this.smokingRepository.findById(id).orElseThrow(SmokingTrackerNotFoundException::new);
        smokingRepository.delete(smokingTracker);
        return smokingTracker;
    }
}
