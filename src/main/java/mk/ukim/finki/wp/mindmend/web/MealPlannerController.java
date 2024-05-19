package mk.ukim.finki.wp.mindmend.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.dto.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.MealPlanner;
import mk.ukim.finki.wp.mindmend.model.Recipe;
import mk.ukim.finki.wp.mindmend.service.impl.MealPlannerServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meal-planner")
public class MealPlannerController {
    private final MealPlannerServiceImpl mealPlannerService;

    @GetMapping(value = {"/",""})
    public List<MealPlannerDTO> listMealPlanners()
    {
        return this.mealPlannerService.findAllMealPlanners();
    }

    @GetMapping("/{mealId}")
    public MealPlannerDTO getMealPlannerById(@PathVariable Long mealId)
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
