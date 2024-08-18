package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.mapppers.MealPlannerMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.model.exceptions.MealPlannerAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.SocialSphereAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.SocialSphereNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;
import mk.ukim.finki.wp.mindmend.model.Recipe;
import mk.ukim.finki.wp.mindmend.model.exceptions.MealPlannerNotFoundException;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
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


    @Override
    public List<MealPlanner> findAllMealPlanners() {
        return this.mealPlannerRepository.findAll();
    }

    @Override
    public MealPlanner findById(Long id) {
        return this.mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new);
    }

    @Override
    public MealPlanner create(ApplicationUser user) {
        if (mealPlannerRepository.getMealPlannerByUser(user).isPresent()) {
            throw new MealPlannerAlreadyExistsException();
        }
        List<Recipe> recipes = recipeRepository
                .findAll()
                .stream()
                .limit(50)
                .toList();
        return mealPlannerRepository.save(new MealPlanner(user, recipes));
    }

    @Override
    public MealPlanner edit(Long id, MealPlannerDTO mealPlannerDTO) {
        MealPlanner mealPlanner = this.mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new);
        mealPlanner.setRecipes(mealPlannerDTO.getRecipeList());
        return mealPlannerRepository.save(mealPlanner);
    }

    @Override
    public MealPlanner delete(Long id, ApplicationUser user) {
        MealPlanner mealPlanner = this.mealPlannerRepository.findById(id).orElseThrow(MealPlannerNotFoundException::new);
        this.mealPlannerRepository.delete(mealPlanner);
        create(user);
        return mealPlanner;
    }

    @Override
    public MealPlanner findByUser(ApplicationUser user) {
        return mealPlannerRepository.getMealPlannerByUser(user).orElseThrow(MealPlannerNotFoundException::new);
    }
}
