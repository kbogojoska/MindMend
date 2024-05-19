package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.HydroTrackRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.HydroTrackService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HydroTrackImpl implements HydroTrackService {

    private final HydroTrackRepository hydroTrackRepository;
    private final ApplicationUserService applicationUserService;

    public HydroTrackImpl(HydroTrackRepository hydroTrackRepository,
                          ApplicationUserService applicationUserService) {
        this.hydroTrackRepository = hydroTrackRepository;
        this.applicationUserService = applicationUserService;
    }

    @Override
    public List<HydroTrack> findAllHydroTracks() {
        return hydroTrackRepository.findAll();
    }

    @Override
    public HydroTrack findById(Long Id) {
        return hydroTrackRepository.findById(Id).orElseThrow(HydroTrackNotFoundException::new);
    }

    @Override
    public HydroTrack create(Integer numGlassesOfWater, Integer personalGoal) {
        // for testing method can run only once because of the one to one relation
        // will be logged user later
        ApplicationUser user = applicationUserService.create("pip", "pip.m.com", "123");
        //
        return personalGoal == null ?
                hydroTrackRepository.save(new HydroTrack(numGlassesOfWater, user)) :
                hydroTrackRepository.save(new HydroTrack(numGlassesOfWater, personalGoal, user));
    }

    @Override
    public HydroTrack edit(Long Id, Integer numGlassesOfWater, Integer personalGoal) {
        HydroTrack hydroTrack = findById(Id);
        if (personalGoal != null)
            hydroTrack.setPersonalGoal(personalGoal);
        hydroTrack.setNumGlassesOfWater(numGlassesOfWater);
        return hydroTrackRepository.save(hydroTrack);
    }

    @Override
    public HydroTrack delete(Long Id) {
        HydroTrack hydroTrack = findById(Id);
        hydroTrackRepository.delete(hydroTrack);
        return hydroTrack;
    }
}
