package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.Recipe;

import java.util.List;

@Data
@AllArgsConstructor
public class MealPlannerDTO {
    private Long userId;
    private List<Recipe> recipeList;

//    public MealPlannerDTO(List<Recipe> recipeList) {
//        this.recipeList = recipeList;
//    }
//
//    public MealPlannerDTO() {
//        // Default constructor
//    }
}
