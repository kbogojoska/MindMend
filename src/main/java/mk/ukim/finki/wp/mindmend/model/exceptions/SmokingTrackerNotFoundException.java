package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SmokingTrackerNotFoundException extends RuntimeException{
    public SmokingTrackerNotFoundException() {
        super("SmokingTracker not found");
    }
}
