package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.service.SleepTrackerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sleep-tracker")
public class SleepTrackerController {
    private final SleepTrackerService sleepTrackerService;

    public SleepTrackerController(SleepTrackerService sleepTrackerService) {
        this.sleepTrackerService = sleepTrackerService;
    }

    @GetMapping
    public String Index() {
        return "index";
    }
}
