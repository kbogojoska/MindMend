package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;
import mk.ukim.finki.wp.mindmend.service.ScreenTimeTrackerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin({"chrome-extension://migfoencdaebpjdhkjodepnekmapmjlb", "http://localhost:3000"})
@RequestMapping("/api/screen-tracker")
public class ScreenTrackerController {
    private final ScreenTimeTrackerService screenTimeTrackerService;

    public ScreenTrackerController(ScreenTimeTrackerService screenTimeTrackerService) {
        this.screenTimeTrackerService = screenTimeTrackerService;
    }

    @GetMapping(value={"","/"})
    public List<ScreenTimeTracker> getScreenTrackers()
    {
        return screenTimeTrackerService.findAllScreenTimeTrackers();
    }

    @GetMapping("/{screenId}")
    public ScreenTimeTracker getScreenTrackerById(@PathVariable Long screenId)
    {
        return this.screenTimeTrackerService.findById(screenId);
    }

    @PostMapping("/add")
    public ScreenTimeTracker create(@RequestBody ScreenTimeDTO screenTimeDTO)
    {
        return this.screenTimeTrackerService.create(screenTimeDTO.getWorkTimeStart(),screenTimeDTO.getWorkTimeEnd());
    }

    @PostMapping("/edit/{screenId}")
    public ScreenTimeTracker edit(@RequestBody ScreenTimeDTO screenTimeDTO, @PathVariable Long screenId)
    {
        return this.screenTimeTrackerService.edit(screenId,screenTimeDTO.getWorkTimeStart(),screenTimeDTO.getWorkTimeEnd());
    }

    @PostMapping("/delete/{screenId}")
    public ScreenTimeTracker delete(@PathVariable Long screenId)
    {
        return this.screenTimeTrackerService.delete(screenId);
    }
}

