package mk.ukim.finki.wp.mindmend.model.exceptions;

public class ScreenTrackerAlreadyExistsException extends RuntimeException{
    public ScreenTrackerAlreadyExistsException() {
        super("Screen tracker already exists exception");
    }
}
