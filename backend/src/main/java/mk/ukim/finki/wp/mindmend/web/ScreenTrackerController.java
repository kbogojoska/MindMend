package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.HydroTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.ScreenTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.ScreenTimeTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/screen-tracker")
public class ScreenTrackerController {
    private final ScreenTimeTrackerService screenTimeTrackerService;
    private final ApplicationUserService applicationUserService;

    public ScreenTrackerController(ScreenTimeTrackerService screenTimeTrackerService, ApplicationUserService applicationUserService) {
        this.screenTimeTrackerService = screenTimeTrackerService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"", "/"})
    public List<ScreenTimeTracker> getScreenTrackers() {
        return screenTimeTrackerService.findAllScreenTimeTrackers();
    }

    @GetMapping("/{screenId}")
    public ResponseEntity<ScreenTrackerResponseDTO> getScreenTrackerById(@PathVariable Long screenId) {
        ScreenTimeTracker screenTimeTracker = screenTimeTrackerService.findById(screenId);
        ScreenTrackerResponseDTO screenTrackerResponseDTO = new ScreenTrackerResponseDTO(
                screenTimeTracker.getId(),
                screenTimeTracker.getApplicationUser().getUsername(),
                screenTimeTracker.getWorkTimeStart(),
                screenTimeTracker.getWorkTimeEnd(),
                screenTimeTracker.getNextBreakTime(),
                screenTimeTracker.getEndOfBreakTime()
        );
        return ResponseEntity.ok(screenTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ScreenTrackerResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        ScreenTimeTracker screenTimeTracker = screenTimeTrackerService.findByUser(applicationUserService.findById(userId));
        ScreenTrackerResponseDTO screenTrackerResponseDTO = new ScreenTrackerResponseDTO(
                screenTimeTracker.getId(),
                screenTimeTracker.getApplicationUser().getUsername(),
                screenTimeTracker.getWorkTimeStart(),
                screenTimeTracker.getWorkTimeEnd(),
                screenTimeTracker.getNextBreakTime(),
                screenTimeTracker.getEndOfBreakTime()
        );
        return ResponseEntity.ok(screenTrackerResponseDTO);
    }

    @PostMapping("/add")
    public ScreenTimeTracker create(@RequestBody ScreenTimeDTO screenTimeDTO) {
        return this.screenTimeTrackerService.create(
                screenTimeDTO.getWorkTimeStart(),
                screenTimeDTO.getWorkTimeEnd(),
                applicationUserService.findById(screenTimeDTO.getUserId()));
    }

    @PostMapping("/edit/{screenId}")
    public ResponseEntity<ScreenTrackerResponseDTO> edit(@RequestBody ScreenTimeDTO screenTimeDTO, @PathVariable Long screenId) {
        ScreenTimeTracker screenTimeTracker = screenTimeTrackerService.edit(screenId, screenTimeDTO.getWorkTimeStart(), screenTimeDTO.getWorkTimeEnd());
        ScreenTrackerResponseDTO screenTrackerResponseDTO = new ScreenTrackerResponseDTO(
                screenTimeTracker.getId(),
                screenTimeTracker.getApplicationUser().getUsername(),
                screenTimeTracker.getWorkTimeStart(),
                screenTimeTracker.getWorkTimeEnd(),
                screenTimeTracker.getNextBreakTime(),
                screenTimeTracker.getEndOfBreakTime()
        );
        return ResponseEntity.ok(screenTrackerResponseDTO);
    }

    @PostMapping("/delete/{screenId}")
    public ScreenTimeTracker delete(@PathVariable Long screenId) {
        ApplicationUser applicationUser = screenTimeTrackerService.findById(screenId).getApplicationUser();
        return this.screenTimeTrackerService.delete(screenId, applicationUser);
    }
}

