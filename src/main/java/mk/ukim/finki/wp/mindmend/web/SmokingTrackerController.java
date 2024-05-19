package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SmokingTracker;
import mk.ukim.finki.wp.mindmend.service.SmokingTrackerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/smoke-tracker")
public class SmokingTrackerController {
    private final SmokingTrackerService smokingTrackerService;

    public SmokingTrackerController(SmokingTrackerService smokingTrackerService) {
        this.smokingTrackerService = smokingTrackerService;
    }

    @GetMapping(value = {"", "/"})
    public List<SmokingTracker> getAllSmokeTracker() {
        return this.smokingTrackerService.findAllSmokingTrackers();
    }

    @GetMapping("/{id}")
    public SmokingTracker getSmokeTrackerById(@PathVariable Long id) {
        return this.smokingTrackerService.findById(id);
    }

    @PostMapping("/add")
    public SmokingTracker create(@RequestBody SmokingTrackerDTO smokingTrackerDTO) {
        return this.smokingTrackerService.create(smokingTrackerDTO);
    }

    @PostMapping("/edit/{id}")
    public SmokingTracker edit(@RequestBody SmokingTrackerDTO smokingTrackerDTO, @PathVariable Long id) {
        return this.smokingTrackerService.edit(id, smokingTrackerDTO);
    }

    @PostMapping("/delete/{id}")
    public SmokingTracker delete(@PathVariable Long id) {
        return this.smokingTrackerService.delete(id);
    }
}
