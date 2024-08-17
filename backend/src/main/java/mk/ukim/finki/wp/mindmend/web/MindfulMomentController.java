package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.MindfulMomentDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.HydroTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.MindfulMomentResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.habits.MindfulMoment;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.MindfulMomentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/mindful-moment")
public class MindfulMomentController {
    private final MindfulMomentService mindfulMomentService;
    private final ApplicationUserService applicationUserService;

    public MindfulMomentController(MindfulMomentService mindfulMomentService, ApplicationUserService applicationUserService) {
        this.mindfulMomentService = mindfulMomentService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"/", ""})
    public List<MindfulMoment> findAllMindfulMoments() {
        return mindfulMomentService.findAllMindfulMoments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MindfulMomentResponseDTO> findById(@PathVariable Long id) {
        MindfulMoment mindfulMoment = mindfulMomentService.findById(id);
        MindfulMomentResponseDTO mindfulMomentResponseDTO = new MindfulMomentResponseDTO(
                mindfulMoment.getId(),
                mindfulMoment.getApplicationUser().getUsername(),
                mindfulMoment.getStartOfWorkShift(),
                mindfulMoment.getEndOfWorkShift(),
                mindfulMoment.getStressLevel()
        );
        return ResponseEntity.ok(mindfulMomentResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<MindfulMomentResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        MindfulMoment mindfulMoment = mindfulMomentService.findByUser(applicationUserService.findById(userId));
        MindfulMomentResponseDTO mindfulMomentResponseDTO = new MindfulMomentResponseDTO(
                mindfulMoment.getId(),
                mindfulMoment.getApplicationUser().getUsername(),
                mindfulMoment.getStartOfWorkShift(),
                mindfulMoment.getEndOfWorkShift(),
                mindfulMoment.getStressLevel()
        );
        return ResponseEntity.ok(mindfulMomentResponseDTO);
    }

    @PostMapping("/add")
    public MindfulMoment create(@RequestBody MindfulMomentDTO MindfulMomentDto) {
        return mindfulMomentService.create(
                MindfulMomentDto.getStartOfWorkShift(),
                MindfulMomentDto.getEndOfWorkShift(),
                MindfulMomentDto.getStressLevel(),
                applicationUserService.findById(MindfulMomentDto.getUserId()));
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<MindfulMomentResponseDTO> edit(@PathVariable Long id,
                                                         @RequestBody MindfulMomentDTO MindfulMomentDto) {
        MindfulMoment mindfulMoment = mindfulMomentService.edit(
                id,
                MindfulMomentDto.getStartOfWorkShift(),
                MindfulMomentDto.getEndOfWorkShift(),
                MindfulMomentDto.getStressLevel());

        MindfulMomentResponseDTO mindfulMomentResponseDTO = new MindfulMomentResponseDTO(
                mindfulMoment.getId(),
                mindfulMoment.getApplicationUser().getUsername(),
                mindfulMoment.getStartOfWorkShift(),
                mindfulMoment.getEndOfWorkShift(),
                mindfulMoment.getStressLevel()
        );
        return ResponseEntity.ok(mindfulMomentResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public MindfulMoment delete(@PathVariable Long id) {
        ApplicationUser applicationUser = mindfulMomentService.findById(id).getApplicationUser();
        return mindfulMomentService.delete(id, applicationUser);
    }
}
