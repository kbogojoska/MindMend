package mk.ukim.finki.wp.mindmend.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;
import mk.ukim.finki.wp.mindmend.service.impl.ActiveMoveTrackerServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://migfoencdaebpjdhkjodepnekmapmjlb", "http://localhost:3000"})
@RequestMapping("/api/activemove-tracker")
@RequiredArgsConstructor
public class ActiveMoveController {
    private final ActiveMoveTrackerServiceImpl activeMoveTrackerService;

    @GetMapping(value = {"","/"})
    public List<ActiveMoveTracker> getMoveTrackers()
    {
        return this.activeMoveTrackerService.findAllMoveTrackers();
    }

    @GetMapping("/{activeId}")
    public ActiveMoveTracker getMoveTrackerById(@PathVariable Long activeId)
    {
        return this.activeMoveTrackerService.findById(activeId);
    }

    @PostMapping("/add")
    public ActiveMoveTracker create(@RequestBody ActiveMoveTrackerDTO activeMoveTrackerDTO)
    {
        return this.activeMoveTrackerService.create(activeMoveTrackerDTO.getDailySteps());
    }

    @PostMapping("/edit/{activeId}")
    public ActiveMoveTracker edit(@RequestBody ActiveMoveTrackerDTO activeMoveTrackerDTO, @PathVariable Long activeId)
    {
        return this.activeMoveTrackerService.edit(activeId,activeMoveTrackerDTO.getDailySteps());
    }

    @PostMapping("/delete/{activeId}")
    public ActiveMoveTracker delete(@PathVariable Long activeId)
    {
        return this.activeMoveTrackerService.delete(activeId);
    }
}
