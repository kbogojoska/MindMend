package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.SleepTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SleepTracker;
import mk.ukim.finki.wp.mindmend.service.SleepTrackerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sleep-tracker")
public class SleepTrackerController {
    private final SleepTrackerService sleepTrackerService;

    public SleepTrackerController(SleepTrackerService sleepTrackerService) {
        this.sleepTrackerService = sleepTrackerService;
    }

    @GetMapping(value = {"/",""})
    public List<SleepTracker> findAllSleepTrackers() {
        return sleepTrackerService.findAllSleepTrackers();
    }

    @GetMapping("/{id}")
    public SleepTracker findById(@PathVariable Long id) {
        return sleepTrackerService.findById(id);
    }

    @PostMapping("/add")
    public SleepTracker create(@RequestBody SleepTrackerDTO sleepTrackerDto) {
        return sleepTrackerService.create(
                sleepTrackerDto.getRecommendedSleepTime(),
                sleepTrackerDto.getWakeUpTime(),
                sleepTrackerDto.getBedTime());
    }

    @PostMapping("/edit/{id}")
    public SleepTracker edit(@PathVariable Long id,
                       @RequestBody SleepTrackerDTO sleepTrackerDto) {
        return sleepTrackerService.edit(
                id,
                sleepTrackerDto.getRecommendedSleepTime(),
                sleepTrackerDto.getWakeUpTime(),
                sleepTrackerDto.getBedTime());
    }

    @DeleteMapping("/delete/{id}")
    public SleepTracker delete(@PathVariable Long id) {
        return sleepTrackerService.delete(id);
    }
}
