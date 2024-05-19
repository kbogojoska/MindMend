package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.dto.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.ScreenTimeTracker;
import mk.ukim.finki.wp.mindmend.service.ScreenTimeTrackerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/screen-tracker")
public class ScreenTrackerController {
    private final ScreenTimeTrackerService screenTimeTrackerService;

    public ScreenTrackerController(ScreenTimeTrackerService screenTimeTrackerService) {
        this.screenTimeTrackerService = screenTimeTrackerService;
    }

    @GetMapping(value={"","/"})
    public List<ScreenTimeDTO> getScreenTrackers()
    {
        return screenTimeTrackerService.findAllScreenTimeTrackers();
    }

    @GetMapping("/{screenId}")
    public ScreenTimeDTO getScreenTrackerById(@PathVariable Long screenId)
    {
        return this.screenTimeTrackerService.findById(screenId);
    }

    @PostMapping("/add")
    public ScreenTimeTracker create(@RequestBody ScreenTimeDTO screenTimeDTO)
    {
        return this.screenTimeTrackerService.create(screenTimeDTO);
    }

    @PostMapping("/edit/{screenId}")
    public ScreenTimeTracker edit(@RequestBody ScreenTimeDTO screenTimeDTO, @PathVariable Long screenId)
    {
        return this.screenTimeTrackerService.edit(screenId,screenTimeDTO);
    }

    @PostMapping("/delete/{screenId}")
    public ScreenTimeTracker delete(@PathVariable Long screenId)
    {
        return this.screenTimeTrackerService.delete(screenId);
    }
}

