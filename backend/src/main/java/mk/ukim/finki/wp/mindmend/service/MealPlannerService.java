package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.DTO.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;

import java.util.List;

public interface MealPlannerService {
    List<MealPlanner> findAllMealPlanners();

    MealPlanner findById(Long id);

    MealPlanner create();

    MealPlanner edit(Long id, MealPlannerDTO mealPlannerDTO);

    MealPlanner delete(Long id);
}
