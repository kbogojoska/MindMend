package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.Recipe;
import mk.ukim.finki.wp.mindmend.model.exceptions.RecipeNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import mk.ukim.finki.wp.mindmend.repository.MealPlannerRepository;
import mk.ukim.finki.wp.mindmend.repository.RecipeRepository;
import mk.ukim.finki.wp.mindmend.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final MealPlannerRepository mealPlannerRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository,
                             MealPlannerRepository mealPlannerRepository) {
        this.recipeRepository = recipeRepository;
        this.mealPlannerRepository = mealPlannerRepository;
    }

    @Override
    public List<Recipe> findAllRecipes() {
        return this.recipeRepository.findAll();
    }

    @Override
    public Recipe findById(Long id) {
        return this.recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
    }

    @Override
    public Recipe create(String name, String ingredients) {
        Recipe recipe = new Recipe(name, ingredients);
        recipeRepository.save(recipe);
        addRecipeToAllMealPlanners(recipe);
        return recipe;
    }

    @Override
    public Recipe edit(Long id, String name, String ingredients) {
        Recipe recipe=findById(id);
        recipe.setName(name);
        recipe.setIngredients(ingredients);
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe delete(Long id) {
        Recipe recipe=findById(id);
        this.recipeRepository.delete(recipe);
        return recipe;
    }

    private void addRecipeToAllMealPlanners(Recipe recipe) {
        List<MealPlanner> allPlanners = mealPlannerRepository.findAll();
        for (MealPlanner planner : allPlanners) {
            planner.getRecipes().add(recipe);
            mealPlannerRepository.save(planner);
        }
    }
}
