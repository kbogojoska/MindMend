package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.Recipe;

@Data
@AllArgsConstructor
public class MealPlannerResponseDTO {
    private Long id;
    private String username;
    private Recipe recipeOfTheDay;
}
