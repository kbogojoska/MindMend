package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.DrinkingTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.HydroTrackerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.DrinkingTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/drinking-tracker")
public class DrinkingTrackerController {
    private final DrinkingTrackerService drinkingTrackerService;
    private final ApplicationUserService applicationUserService;

    public DrinkingTrackerController(DrinkingTrackerService drinkingTrackerService, ApplicationUserService applicationUserService) {
        this.drinkingTrackerService = drinkingTrackerService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"","/"})
    public List<DrinkingTracker> getDrinkTrackers()
    {
        return drinkingTrackerService.findAllDrinkingTrackers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrinkingTrackerResponseDTO> getDrinkTrackerById(@PathVariable Long id)
    {
        DrinkingTracker drinkingTracker = drinkingTrackerService.findById(id);
        DrinkingTrackerResponseDTO drinkingTrackerResponseDTO = new DrinkingTrackerResponseDTO(
                drinkingTracker.getId(),
                drinkingTracker.getApplicationUser().getUsername(),
                drinkingTracker.getNumOfDrinks(),
                drinkingTracker.getMaxDrinks()
        );
        return ResponseEntity.ok(drinkingTrackerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<DrinkingTrackerResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        DrinkingTracker drinkingTracker = drinkingTrackerService.findByUser(applicationUserService.findById(userId));
        DrinkingTrackerResponseDTO drinkingTrackerResponseDTO = new DrinkingTrackerResponseDTO(
                drinkingTracker.getId(),
                drinkingTracker.getApplicationUser().getUsername(),
                drinkingTracker.getNumOfDrinks(),
                drinkingTracker.getMaxDrinks()
        );
        return ResponseEntity.ok(drinkingTrackerResponseDTO);
    }

    @PostMapping("/add")
    public DrinkingTracker create(@RequestBody DrinkingTrackerDTO drinkingTrackerDTO)
    {
        return drinkingTrackerService.create(
                drinkingTrackerDTO.getNumOfDrinks(),
                drinkingTrackerDTO.getMaxDrinks(),
                applicationUserService.findById(drinkingTrackerDTO.getUserId())
        );
    }
    @PostMapping("/edit/{id}")
    public ResponseEntity<DrinkingTrackerResponseDTO> edit(@RequestBody DrinkingTrackerDTO drinkingTrackerDTO, @PathVariable Long id)
    {
        DrinkingTracker drinkingTracker = drinkingTrackerService.edit(
                id,
                drinkingTrackerDTO.getNumOfDrinks(),
                drinkingTrackerDTO.getMaxDrinks());

        DrinkingTrackerResponseDTO drinkingTrackerResponseDTO = new DrinkingTrackerResponseDTO(
                drinkingTracker.getId(),
                drinkingTracker.getApplicationUser().getUsername(),
                drinkingTracker.getNumOfDrinks(),
                drinkingTracker.getMaxDrinks()
        );
        return ResponseEntity.ok(drinkingTrackerResponseDTO);
    }
    @DeleteMapping("/delete/{id}")
    public DrinkingTracker delete(@PathVariable Long id)
    {
        ApplicationUser applicationUser = drinkingTrackerService.findById(id).getApplicationUser();
        return drinkingTrackerService.delete(id, applicationUser);
    }
}
