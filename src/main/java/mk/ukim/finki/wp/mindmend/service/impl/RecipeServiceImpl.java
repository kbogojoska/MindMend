package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.Recipe;
import mk.ukim.finki.wp.mindmend.model.exceptions.RecipeNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.RecipeRepository;
import mk.ukim.finki.wp.mindmend.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
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
        return this.recipeRepository.save(new Recipe(name,ingredients));
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
}
