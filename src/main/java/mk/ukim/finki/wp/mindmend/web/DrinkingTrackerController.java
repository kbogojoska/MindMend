package mk.ukim.finki.wp.mindmend.web;

import jakarta.persistence.GeneratedValue;
import mk.ukim.finki.wp.mindmend.dto.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.service.DrinkingTrackerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drink-tracker")
public class DrinkingTrackerController {
    private final DrinkingTrackerService drinkingTrackerService;

    public DrinkingTrackerController(DrinkingTrackerService drinkingTrackerService) {
        this.drinkingTrackerService = drinkingTrackerService;
    }

    @GetMapping(value = {"","/"})
    public List<DrinkingTrackerDTO> getDrinkTrackers()
    {
        return drinkingTrackerService.findAllDrinkingTrackers();
    }

    @GetMapping("/{id}")
    public DrinkingTrackerDTO getDrinkTrackerById(@PathVariable Long id)
    {
        return drinkingTrackerService.findById(id);
    }

    @PostMapping("/add")
    public DrinkingTracker create(@RequestBody DrinkingTrackerDTO drinkingTrackerDTO)
    {
        return drinkingTrackerService.create(drinkingTrackerDTO);
    }
    @PostMapping("/edit/{id}")
    public DrinkingTracker edit(@RequestBody DrinkingTrackerDTO drinkingTrackerDTO, @PathVariable Long id)
    {
        return drinkingTrackerService.edit(id,drinkingTrackerDTO);
    }
    @PostMapping("/delete/{id}")
    public DrinkingTracker delete(@PathVariable Long id)
    {
        return drinkingTrackerService.delete(id);
    }
}
