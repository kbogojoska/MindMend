package mk.ukim.finki.wp.mindmend.model.exceptions;

public class DrinkingTrackerAlreadyExistsException extends RuntimeException{
    public DrinkingTrackerAlreadyExistsException() {
        super("Drinking tracker already exists");
    }
}
