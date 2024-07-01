package mk.ukim.finki.wp.mindmend.model.exceptions;

public class RecipeNotFoundException extends RuntimeException{
    public RecipeNotFoundException() {
        super("Recipe doesn't exist");
    }
}
