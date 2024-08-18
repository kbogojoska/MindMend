package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.SleepTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.SleepTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SleepTracker;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.SleepTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/sleep-tracker")
public class SleepTrackerController {
    private final SleepTrackerService sleepTrackerService;
    private final ApplicationUserService applicationUserService;

    public SleepTrackerController(SleepTrackerService sleepTrackerService, ApplicationUserService applicationUserService) {
        this.sleepTrackerService = sleepTrackerService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"/",""})
    public List<SleepTracker> findAllSleepTrackers() {
        return sleepTrackerService.findAllSleepTrackers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SleepTrackerResponseDTO> findById(@PathVariable Long id) {
        SleepTracker sleepTracker = sleepTrackerService.findById(id);
        SleepTrackerResponseDTO sleepTrackerResponseDTO = new SleepTrackerResponseDTO(
                sleepTracker.getId(),
                sleepTracker.getApplicationUser().getUsername(),
                sleepTracker.getRecommendedSleepTime(),
                sleepTracker.getWakeUpTime(),
                sleepTracker.getBedTime()
        );
        return ResponseEntity.ok(sleepTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<SleepTrackerResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        SleepTracker sleepTracker = sleepTrackerService.findByUser(applicationUserService.findById(userId));
        SleepTrackerResponseDTO sleepTrackerResponseDTO = new SleepTrackerResponseDTO(
                sleepTracker.getId(),
                sleepTracker.getApplicationUser().getUsername(),
                sleepTracker.getRecommendedSleepTime(),
                sleepTracker.getWakeUpTime(),
                sleepTracker.getBedTime()
        );
        return ResponseEntity.ok(sleepTrackerResponseDTO);
    }

    @PostMapping("/add")
    public SleepTracker create(@RequestBody SleepTrackerDTO sleepTrackerDto) {
        return sleepTrackerService.create(
                sleepTrackerDto.getRecommendedSleepTime(),
                sleepTrackerDto.getWakeUpTime(),
                sleepTrackerDto.getBedTime(),
                applicationUserService.findById(sleepTrackerDto.getUserId()));
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<SleepTrackerResponseDTO> edit(@PathVariable Long id,
                                                        @RequestBody SleepTrackerDTO sleepTrackerDto) {
        SleepTracker sleepTracker = sleepTrackerService.edit(
                                        id,
                                        sleepTrackerDto.getRecommendedSleepTime(),
                                        sleepTrackerDto.getWakeUpTime(),
                                        sleepTrackerDto.getBedTime());

        SleepTrackerResponseDTO sleepTrackerResponseDTO = new SleepTrackerResponseDTO(
                sleepTracker.getId(),
                sleepTracker.getApplicationUser().getUsername(),
                sleepTracker.getRecommendedSleepTime(),
                sleepTracker.getWakeUpTime(),
                sleepTracker.getBedTime()
        );
        return ResponseEntity.ok(sleepTrackerResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public SleepTracker delete(@PathVariable Long id) {
        ApplicationUser applicationUser = sleepTrackerService.findById(id).getApplicationUser();
        return sleepTrackerService.delete(id, applicationUser);
    }
}
