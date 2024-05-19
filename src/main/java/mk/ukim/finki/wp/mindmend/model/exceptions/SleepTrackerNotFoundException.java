package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SleepTrackerNotFoundException extends RuntimeException{
    public SleepTrackerNotFoundException() {
        super("Sleep tracker not found");
    }
}
