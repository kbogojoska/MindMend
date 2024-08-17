package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.HydroTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.SmokingTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.habits.SmokingTracker;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.SmokingTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/smoking-tracker")
public class SmokingTrackerController {
    private final SmokingTrackerService smokingTrackerService;
    private final ApplicationUserService applicationUserService;

    public SmokingTrackerController(SmokingTrackerService smokingTrackerService, ApplicationUserService applicationUserService) {
        this.smokingTrackerService = smokingTrackerService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"", "/"})
    public List<SmokingTracker> getAllSmokeTracker() {
        return this.smokingTrackerService.findAllSmokingTrackers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmokingTrackerResponseDTO> getSmokeTrackerById(@PathVariable Long id) {
        SmokingTracker smokingTracker = smokingTrackerService.findById(id);
        SmokingTrackerResponseDTO smokingTrackerResponseDTO = new SmokingTrackerResponseDTO(
                smokingTracker.getId(),
                smokingTracker.getApplicationUser().getUsername(),
                smokingTracker.getCigarettesPerDay(),
                smokingTracker.getMaxCigarettesPerDay()
        );
        return ResponseEntity.ok(smokingTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<SmokingTrackerResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        SmokingTracker smokingTracker = smokingTrackerService.findByUser(applicationUserService.findById(userId));
        SmokingTrackerResponseDTO smokingTrackerResponseDTO = new SmokingTrackerResponseDTO(
                smokingTracker.getId(),
                smokingTracker.getApplicationUser().getUsername(),
                smokingTracker.getCigarettesPerDay(),
                smokingTracker.getMaxCigarettesPerDay()
        );
        return ResponseEntity.ok(smokingTrackerResponseDTO);
    }
    @PostMapping("/add")
    public SmokingTracker create(@RequestBody SmokingTrackerDTO smokingTrackerDTO) {
        return this.smokingTrackerService.create(smokingTrackerDTO.getCigarettesPerDay(),
                smokingTrackerDTO.getMaxCigarettesPerDay(),
                applicationUserService.findById(smokingTrackerDTO.getUserId()));
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<SmokingTrackerResponseDTO> edit(@PathVariable Long id,
                                                          @RequestBody SmokingTrackerDTO smokingTrackerDTO) {
        SmokingTracker smokingTracker = smokingTrackerService.edit(
                id,
                smokingTrackerDTO.getCigarettesPerDay(),
                smokingTrackerDTO.getMaxCigarettesPerDay());

        SmokingTrackerResponseDTO smokingTrackerResponseDTO = new SmokingTrackerResponseDTO(
                smokingTracker.getId(),
                smokingTracker.getApplicationUser().getUsername(),
                smokingTracker.getCigarettesPerDay(),
                smokingTracker.getMaxCigarettesPerDay()
        );
        return ResponseEntity.ok(smokingTrackerResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public SmokingTracker delete(@PathVariable Long id) {
        ApplicationUser applicationUser = smokingTrackerService.findById(id).getApplicationUser();
        return this.smokingTrackerService.delete(id, applicationUser);
    }
}
