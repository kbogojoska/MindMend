package mk.ukim.finki.wp.mindmend.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.MealPlannerResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.impl.MealPlannerServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/meal-planner")
public class MealPlannerController {
    private final MealPlannerServiceImpl mealPlannerService;
    private final ApplicationUserService applicationUserService;

    @GetMapping(value = {"/",""})
    public List<MealPlannerResponseDTO> listMealPlanners()
    {
        List<MealPlanner> mealPlanners = mealPlannerService.findAllMealPlanners();
        return mealPlanners.stream().map(mealplanner -> new MealPlannerResponseDTO(mealplanner.getId(),
                        mealplanner.getUser().getUsername(),
                        mealplanner.getPickOfTheDay(mealplanner.getUser().getId())))
                        .collect(Collectors.toList());
    }

    @GetMapping("/{mealId}")
    public ResponseEntity<MealPlannerResponseDTO> getMealPlannerById(@PathVariable Long mealId)
    {
        MealPlanner mealPlanner = mealPlannerService.findById(mealId);
        MealPlannerResponseDTO mealPlannerResponseDTO = new MealPlannerResponseDTO(
                mealPlanner.getId(),
                mealPlanner.getUser().getUsername(),
                mealPlanner.getPickOfTheDay(mealPlanner.getUser().getId())
        );
        return ResponseEntity.ok(mealPlannerResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<MealPlannerResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        MealPlanner mealPlanner = mealPlannerService.findByUser(applicationUserService.findById(userId));
        MealPlannerResponseDTO mealPlannerResponseDTO = new MealPlannerResponseDTO(
                mealPlanner.getId(),
                mealPlanner.getUser().getUsername(),
                mealPlanner.getPickOfTheDay(mealPlanner.getUser().getId())
        );
        return ResponseEntity.ok(mealPlannerResponseDTO);
    }

    @PostMapping("/add")
    public MealPlanner create(@RequestBody MealPlannerDTO mealPlannerDTO)
    {
        return this.mealPlannerService.create(applicationUserService.findById(mealPlannerDTO.getUserId()));
    }

    @PostMapping("/edit/{mealId}")
    public ResponseEntity<MealPlannerResponseDTO> edit(@RequestBody MealPlannerDTO mealPlannerDTO, @PathVariable Long mealId)
    {
        MealPlanner mealPlanner = this.mealPlannerService.edit(mealId,mealPlannerDTO);
        MealPlannerResponseDTO mealPlannerResponseDTO = new MealPlannerResponseDTO(
                mealPlanner.getId(),
                mealPlanner.getUser().getUsername(),
                mealPlanner.getPickOfTheDay(mealPlanner.getUser().getId())
        );
        return ResponseEntity.ok(mealPlannerResponseDTO);
    }

    @PostMapping("/delete/{mealId}")
    public MealPlanner delete(@PathVariable Long mealId)
    {
        ApplicationUser applicationUser = mealPlannerService.findById(mealId).getUser();
        return this.mealPlannerService.delete(mealId, applicationUser);
    }

}
