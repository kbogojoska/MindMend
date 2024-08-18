package mk.ukim.finki.wp.mindmend.model.exceptions;

public class MealPlannerNotFoundException extends RuntimeException{
    public MealPlannerNotFoundException() {
        super("Meal Planner not found");
    }
}
