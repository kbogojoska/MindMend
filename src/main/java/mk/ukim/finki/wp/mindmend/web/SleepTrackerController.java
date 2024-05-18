package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.SleepTrackerDto;
import mk.ukim.finki.wp.mindmend.model.SleepTracker;
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

    @GetMapping("/all")
    public List<SleepTracker> findAllSleepTrackers() {
        return sleepTrackerService.findAllSleepTrackers();
    }

    @GetMapping("/{id}")
    public SleepTracker findById(@PathVariable Long id) {
        return sleepTrackerService.findById(id);
    }

    @PostMapping("/add")
    public SleepTracker create(@RequestBody SleepTrackerDto sleepTrackerDto) {
        return sleepTrackerService.create(
                sleepTrackerDto.getRecommendedSleepTime(),
                sleepTrackerDto.getWakeUpTime(),
                sleepTrackerDto.getBedTime());
    }

    @PostMapping("/edit/{id}")
    public SleepTracker edit(@PathVariable Long id,
                       @RequestBody SleepTrackerDto sleepTrackerDto) {
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
