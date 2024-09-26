package mk.ukim.finki.wp.mindmend.model.exceptions;

public class WorkoutTrackerNotFoundException extends RuntimeException{
    public WorkoutTrackerNotFoundException() {
        super("Workout tracker not found");
    }
}
