package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.Recipe;

import java.util.List;

public interface RecipeService {
    List<Recipe> findAllRecipes();

    Recipe findById(Long id);

    Recipe create(String name, String ingredients);

    Recipe edit(Long id, String name, String ingredients);

    Recipe delete(Long id);
}
