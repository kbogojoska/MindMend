package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Getter;
import mk.ukim.finki.wp.mindmend.model.Recipe;

import java.util.List;

@Getter
public class MealPlannerDTO {
    private List<Recipe> recipeList;

    public MealPlannerDTO(List<Recipe> recipeList) {
        this.recipeList = recipeList;
    }

    public MealPlannerDTO() {
        // Default constructor
    }
}
