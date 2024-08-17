package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.HydroTrackDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.HydroTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.HydroTrackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/hydro-track")
public class HydroTrackController {
    private final HydroTrackService hydroTrackService;
    private final ApplicationUserService applicationUserService;

    public HydroTrackController(HydroTrackService hydroTrackService, ApplicationUserService applicationUserService) {
        this.hydroTrackService = hydroTrackService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"/",""})
    public List<HydroTrack> findAllHydroTracks() {
        return hydroTrackService.findAllHydroTracks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HydroTrackerResponseDTO> findById(@PathVariable Long id) {
        HydroTrack hydroTrack = hydroTrackService.findById(id);
        HydroTrackerResponseDTO hydroTrackerResponseDTO = new HydroTrackerResponseDTO(
                hydroTrack.getId(),
                hydroTrack.getApplicationUser().getUsername(),
                hydroTrack.getNumGlassesOfWater(),
                hydroTrack.getPersonalGoal()
        );
        return ResponseEntity.ok(hydroTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<HydroTrackerResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        HydroTrack hydroTrack = hydroTrackService.findByUser(applicationUserService.findById(userId));
        HydroTrackerResponseDTO hydroTrackerResponseDTO = new HydroTrackerResponseDTO(
                hydroTrack.getId(),
                hydroTrack.getApplicationUser().getUsername(),
                hydroTrack.getNumGlassesOfWater(),
                hydroTrack.getPersonalGoal()
        );
        return ResponseEntity.ok(hydroTrackerResponseDTO);
    }

    @PostMapping("/add")
    public HydroTrack create(@RequestBody HydroTrackDTO HydroTrackDto) {
        return hydroTrackService.create(
                HydroTrackDto.getNumGlassesOfWater(),
                HydroTrackDto.getPersonalGoal(),
                applicationUserService.findById(HydroTrackDto.getUserId()));
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<HydroTrackerResponseDTO> edit(@PathVariable Long id,
                                                        @RequestBody HydroTrackDTO HydroTrackDto) {
        HydroTrack hydroTrack = hydroTrackService.edit(
                id,
                HydroTrackDto.getNumGlassesOfWater(),
                HydroTrackDto.getPersonalGoal());

        HydroTrackerResponseDTO hydroTrackerResponseDTO = new HydroTrackerResponseDTO(
                hydroTrack.getId(),
                hydroTrack.getApplicationUser().getUsername(),
                hydroTrack.getNumGlassesOfWater(),
                hydroTrack.getPersonalGoal()
        );
        return ResponseEntity.ok(hydroTrackerResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public HydroTrack delete(@PathVariable Long id) {
        ApplicationUser applicationUser = hydroTrackService.findById(id).getApplicationUser();
        return hydroTrackService.delete(id, applicationUser);
    }
}
