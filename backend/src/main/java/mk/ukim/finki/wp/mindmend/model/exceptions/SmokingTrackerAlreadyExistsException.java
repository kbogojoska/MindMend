package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SmokingTrackerAlreadyExistsException extends RuntimeException{
    public SmokingTrackerAlreadyExistsException() {
        super("Smoking tracker already exists");
    }
}
