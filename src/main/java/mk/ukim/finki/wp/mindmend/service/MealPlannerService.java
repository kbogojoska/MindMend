package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.dto.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.MealPlanner;
import mk.ukim.finki.wp.mindmend.model.Recipe;

import java.util.List;

public interface MealPlannerService {
    List<MealPlannerDTO> findAllMealPlanners();

    MealPlannerDTO findById(Long id);

    MealPlanner create();

    MealPlanner edit(Long id, MealPlannerDTO mealPlannerDTO);

    MealPlanner delete(Long id);
}
