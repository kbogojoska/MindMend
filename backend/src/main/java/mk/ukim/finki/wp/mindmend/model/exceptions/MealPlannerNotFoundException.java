package mk.ukim.finki.wp.mindmend.model.exceptions;

public class MealPlannerNotFoundException extends RuntimeException{
    public MealPlannerNotFoundException() {
        super("MealPlanner not found");
    }
}
