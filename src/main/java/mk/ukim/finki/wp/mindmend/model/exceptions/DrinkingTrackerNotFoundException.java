package mk.ukim.finki.wp.mindmend.model.exceptions;

public class DrinkingTrackerNotFoundException extends RuntimeException{
    public DrinkingTrackerNotFoundException() {
        super("Drink Tracker not found");
    }
}
