package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.MealPlannerMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;
import mk.ukim.finki.wp.mindmend.model.Recipe;
import mk.ukim.finki.wp.mindmend.model.exceptions.MealPlannerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.MealPlannerRepository;
import mk.ukim.finki.wp.mindmend.repository.RecipeRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.MealPlannerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MealPlannerServiceImpl implements MealPlannerService {
    private final MealPlannerRepository mealPlannerRepository;
    private final RecipeRepository recipeRepository;
    private final ApplicationUserService applicationUserService;


    @Override
    public List<MealPlanner> findAllMealPlanners() {
//        return MealPlannerMapper.MapToListViewModel(this.mealPlannerRepository.findAll());
        return this.mealPlannerRepository.findAll();
    }

    @Override
    public MealPlanner findById(Long id) {
//        return MealPlannerMapper.MapToViewModel(mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new));
        return this.mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new);
    }

    @Override
    public MealPlanner create() {
        List<Recipe> randomRecipes = this.recipeRepository.findAll().stream().limit(5).collect(Collectors.toList());
        ApplicationUser user = applicationUserService.create("kp", "kp7", "kp7@gmail.com");
        return mealPlannerRepository.save(new MealPlanner(user, randomRecipes));
    }

    @Override
    public MealPlanner edit(Long id, MealPlannerDTO mealPlannerDTO) {
        MealPlanner mealPlanner = this.mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new);
        mealPlanner.setRecipes(mealPlannerDTO.getRecipeList());
        return mealPlannerRepository.save(mealPlanner);
    }

    @Override
    public MealPlanner delete(Long id) {
        MealPlanner mealPlanner = this.mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new);
        this.mealPlannerRepository.delete(mealPlanner);
        return mealPlanner;
    }
}
