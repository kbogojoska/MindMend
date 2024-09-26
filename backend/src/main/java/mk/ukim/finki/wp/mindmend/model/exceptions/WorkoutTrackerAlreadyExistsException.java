package mk.ukim.finki.wp.mindmend.model.exceptions;

public class WorkoutTrackerAlreadyExistsException extends RuntimeException{
    public WorkoutTrackerAlreadyExistsException() {
        super("Workout tracker already exists");
    }
}
