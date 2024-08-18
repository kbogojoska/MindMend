package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.SmokingMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackNotFoundException;
import mk.ukim.finki.wp.mindmend.model.exceptions.SmokingTrackerAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
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

    @Override
    public List<SmokingTracker> findAllSmokingTrackers() {
        return smokingRepository.findAll();
    }

    @Override
    public SmokingTracker findById(Long id) {
        return smokingRepository.findById(id).orElseThrow(SmokingTrackerNotFoundException::new);
    }

    @Override
    public SmokingTracker create(Integer numCigarettes, Integer maxCigarettes, ApplicationUser user) {
        if (smokingRepository.getSmokingTrackerByApplicationUser(user).isPresent()) {
            throw new SmokingTrackerAlreadyExistsException();
        }
        return (numCigarettes == null && maxCigarettes == null) ?
                smokingRepository.save(new SmokingTracker(user)) :
                (maxCigarettes == null ? smokingRepository.save(new SmokingTracker(numCigarettes, user)) :
                        smokingRepository.save(new SmokingTracker(numCigarettes, maxCigarettes, user)));
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
    public SmokingTracker delete(Long id, ApplicationUser applicationUser) {
        SmokingTracker smokingTracker = this.smokingRepository.findById(id).orElseThrow(SmokingTrackerNotFoundException::new);
        smokingRepository.delete(smokingTracker);
        create(null, null, applicationUser);
        return smokingTracker;
    }
    @Override
    public SmokingTracker findByUser(ApplicationUser user) {
        return smokingRepository.getSmokingTrackerByApplicationUser(user).orElseThrow(SmokingTrackerNotFoundException::new);
    }
}
