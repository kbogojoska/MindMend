package mk.ukim.finki.wp.mindmend.model.exceptions;

public class MealPlannerAlreadyExistsException extends RuntimeException{
    public MealPlannerAlreadyExistsException() {
        super("Meal Planner already exists");
    }
}
