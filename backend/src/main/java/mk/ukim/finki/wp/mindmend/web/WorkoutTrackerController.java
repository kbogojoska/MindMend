package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.SleepTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.WorkoutTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.SleepTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.WorkoutTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SleepTracker;
import mk.ukim.finki.wp.mindmend.model.habits.WorkoutTracker;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.WorkoutTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/workout-tracker")
public class WorkoutTrackerController {
    private final WorkoutTrackerService workoutTrackerService;
    private final ApplicationUserService applicationUserService;

    public WorkoutTrackerController(WorkoutTrackerService workoutTrackerService, ApplicationUserService applicationUserService) {
        this.workoutTrackerService = workoutTrackerService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"/",""})
    public List<WorkoutTracker> findAllWorkoutTrackers() {
        return workoutTrackerService.findAllWorkoutTrackers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutTrackerResponseDTO> findById(@PathVariable Long id) {
        WorkoutTracker workoutTracker = workoutTrackerService.findById(id);
        WorkoutTrackerResponseDTO workoutTrackerResponseDTO = new WorkoutTrackerResponseDTO(
                workoutTracker.getId(),
                workoutTracker.getApplicationUser().getUsername(),
                workoutTracker.getRecommendedDurationTimeInMinutes(),
                workoutTracker.getStartWorkoutTime(),
                workoutTracker.getEndWorkoutTime()
        );
        return ResponseEntity.ok(workoutTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<WorkoutTrackerResponseDTO> getWorkoutTrackersByUserId(@PathVariable Long userId) {
        WorkoutTracker workoutTracker = workoutTrackerService.findByUser(applicationUserService.findById(userId));
        WorkoutTrackerResponseDTO workoutTrackerResponseDTO = new WorkoutTrackerResponseDTO(
                workoutTracker.getId(),
                workoutTracker.getApplicationUser().getUsername(),
                workoutTracker.getRecommendedDurationTimeInMinutes(),
                workoutTracker.getStartWorkoutTime(),
                workoutTracker.getEndWorkoutTime()
        );
        return ResponseEntity.ok(workoutTrackerResponseDTO);
    }

    @PostMapping("/add")
    public WorkoutTracker create(@RequestBody WorkoutTrackerDTO workoutTrackerDTO) {
        return workoutTrackerService.create(
                workoutTrackerDTO.getRecommendedDurationTimeInMinutes(),
                workoutTrackerDTO.getStartWorkoutTime(),
                workoutTrackerDTO.getEndWorkoutTime(),
                applicationUserService.findById(workoutTrackerDTO.getUserId()));
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<WorkoutTrackerResponseDTO> edit(@PathVariable Long id,
                                                        @RequestBody WorkoutTrackerDTO workoutTrackerDTO) {
        WorkoutTracker workoutTracker = workoutTrackerService.edit(
                id,
                workoutTrackerDTO.getRecommendedDurationTimeInMinutes(),
                workoutTrackerDTO.getStartWorkoutTime(),
                workoutTrackerDTO.getEndWorkoutTime());

        WorkoutTrackerResponseDTO workoutTrackerResponseDTO = new WorkoutTrackerResponseDTO(
                workoutTracker.getId(),
                workoutTracker.getApplicationUser().getUsername(),
                workoutTracker.getRecommendedDurationTimeInMinutes(),
                workoutTracker.getStartWorkoutTime(),
                workoutTracker.getEndWorkoutTime()
        );
        return ResponseEntity.ok(workoutTrackerResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public WorkoutTracker delete(@PathVariable Long id) {
        ApplicationUser applicationUser = workoutTrackerService.findById(id).getApplicationUser();
        return workoutTrackerService.delete(id, applicationUser);
    }
}
