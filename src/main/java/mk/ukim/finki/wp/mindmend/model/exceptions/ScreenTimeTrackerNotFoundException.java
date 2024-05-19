package mk.ukim.finki.wp.mindmend.model.exceptions;

public class ScreenTimeTrackerNotFoundException extends RuntimeException{
    public ScreenTimeTrackerNotFoundException() {
        super("Screen tracker not found");
    }
}
