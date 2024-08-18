package mk.ukim.finki.wp.mindmend.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.ActiveMoveTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.HydroTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.impl.ActiveMoveTrackerServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/activemove-tracker")
@RequiredArgsConstructor
public class ActiveMoveController {
    private final ActiveMoveTrackerServiceImpl activeMoveTrackerService;
    private final ApplicationUserService applicationUserService;

    @GetMapping(value = {"","/"})
    public List<ActiveMoveTracker> getMoveTrackers()
    {
        return this.activeMoveTrackerService.findAllMoveTrackers();
    }

    @GetMapping("/{activeId}")
    public ResponseEntity<ActiveMoveTrackerResponseDTO> getMoveTrackerById(@PathVariable Long activeId)
    {
        ActiveMoveTracker activeMoveTracker = activeMoveTrackerService.findById(activeId);
        ActiveMoveTrackerResponseDTO activeMoveTrackerResponseDTO = new ActiveMoveTrackerResponseDTO(
                activeMoveTracker.getId(),
                activeMoveTracker.getUser().getUsername(),
                activeMoveTracker.getDailyStepsGoal()
        );
        return ResponseEntity.ok(activeMoveTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ActiveMoveTrackerResponseDTO> getActiveMoveTrackersByUserId(@PathVariable Long userId) {
        ActiveMoveTracker activeMoveTracker = activeMoveTrackerService.findByUser(applicationUserService.findById(userId));
        ActiveMoveTrackerResponseDTO activeMoveTrackerResponseDTO = new ActiveMoveTrackerResponseDTO(
                activeMoveTracker.getId(),
                activeMoveTracker.getUser().getUsername(),
                activeMoveTracker.getDailyStepsGoal()
        );
        return ResponseEntity.ok(activeMoveTrackerResponseDTO);
    }
    @PostMapping("/add")
    public ActiveMoveTracker create(@RequestBody ActiveMoveTrackerDTO activeMoveTrackerDTO)
    {
        return this.activeMoveTrackerService.create(
                activeMoveTrackerDTO.getDailySteps(),
                applicationUserService.findById((activeMoveTrackerDTO.getUserId())));
    }

    @PostMapping("/edit/{activeId}")
    public ResponseEntity<ActiveMoveTrackerResponseDTO> edit(@PathVariable Long activeId,
                                                             @RequestBody ActiveMoveTrackerDTO activeMoveTrackerDTO) {
        ActiveMoveTracker activeMoveTracker = activeMoveTrackerService.edit(
                activeId,
                activeMoveTrackerDTO.getDailySteps());

        ActiveMoveTrackerResponseDTO activeMoveTrackerResponseDTO = new ActiveMoveTrackerResponseDTO(
                activeMoveTracker.getId(),
                activeMoveTracker.getUser().getUsername(),
                activeMoveTracker.getDailyStepsGoal()
        );
        return ResponseEntity.ok(activeMoveTrackerResponseDTO);
    }

    @PostMapping("/delete/{activeId}")
    public ActiveMoveTracker delete(@PathVariable Long activeId)
    {
        ApplicationUser applicationUser = activeMoveTrackerService.findById(activeId).getUser();
        return this.activeMoveTrackerService.delete(activeId, applicationUser);
    }
}
