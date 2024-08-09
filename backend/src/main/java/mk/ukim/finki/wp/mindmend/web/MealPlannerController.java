package mk.ukim.finki.wp.mindmend.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;
import mk.ukim.finki.wp.mindmend.service.impl.MealPlannerServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/meal-planner")
public class MealPlannerController {
    private final MealPlannerServiceImpl mealPlannerService;

    @GetMapping(value = {"/",""})
    public List<MealPlanner> listMealPlanners()
    {
        return this.mealPlannerService.findAllMealPlanners();
    }

    @GetMapping("/{mealId}")
    public MealPlanner getMealPlannerById(@PathVariable Long mealId)
    {
        return this.mealPlannerService.findById(mealId);
    }

    @PostMapping("/add")
    public MealPlanner create()
    {
        return this.mealPlannerService.create();
    }

    @PostMapping("/edit/{mealId}")
    public MealPlanner edit(@RequestBody MealPlannerDTO mealPlannerDTO, @PathVariable Long mealId)
    {
        return this.mealPlannerService.edit(mealId,mealPlannerDTO);
    }

    @PostMapping("/delete/{mealId}")
    public MealPlanner delete(@PathVariable Long mealId)
    {
        return this.mealPlannerService.delete(mealId);
    }

}
