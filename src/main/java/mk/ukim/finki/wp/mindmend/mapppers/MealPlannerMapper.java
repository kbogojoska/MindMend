package mk.ukim.finki.wp.mindmend.mapppers;

import mk.ukim.finki.wp.mindmend.model.DTO.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;

import java.util.ArrayList;
import java.util.List;

public class MealPlannerMapper {
    public static MealPlannerDTO MapToViewModel(MealPlanner mealPlanner)
    {
        return new MealPlannerDTO(
                mealPlanner.getRecipes()
        );
    }
    public static List<MealPlannerDTO> MapToListViewModel(List<MealPlanner> mealPlanners){
        List<MealPlannerDTO> mealPlannerDTOS = new ArrayList<>();
        for (var m : mealPlanners){
            mealPlannerDTOS.add(MapToViewModel(m));
        }
        return mealPlannerDTOS;
    }
}
