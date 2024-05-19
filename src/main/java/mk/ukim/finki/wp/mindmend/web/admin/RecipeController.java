package mk.ukim.finki.wp.mindmend.web.admin;

import mk.ukim.finki.wp.mindmend.model.DTO.admin.RecipeDTO;
import mk.ukim.finki.wp.mindmend.model.Recipe;
import mk.ukim.finki.wp.mindmend.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/recipe")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping(value = {"/",""})
    public List<Recipe> findAllRecipes() {
        return recipeService.findAllRecipes();
    }

    @GetMapping("/{id}")
    public Recipe findById(@PathVariable Long id) {
        return recipeService.findById(id);
    }

    @PostMapping("/add")
    public Recipe create(@RequestBody RecipeDTO recipeDTO) {
        return recipeService.create(
                recipeDTO.getName(),
                recipeDTO.getIngredients()
        );
    }

    @PostMapping("/edit/{id}")
    public Recipe edit(@PathVariable Long id,
                               @RequestBody RecipeDTO recipeDTO) {
        return recipeService.edit(id,
                recipeDTO.getName(),
                recipeDTO.getIngredients());
    }

    @DeleteMapping("/delete/{id}")
    public Recipe delete(@PathVariable Long id) {
        return recipeService.delete(id);
    }
}
