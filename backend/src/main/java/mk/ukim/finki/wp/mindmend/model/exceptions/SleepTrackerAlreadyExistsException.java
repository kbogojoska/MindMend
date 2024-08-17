package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SleepTrackerAlreadyExistsException extends RuntimeException{
    public SleepTrackerAlreadyExistsException() {
        super("Sleep tracker already exists exception");
    }
}
