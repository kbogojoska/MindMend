package mk.ukim.finki.wp.mindmend.model.exceptions;

public class ActiveMoveTrackerNotFoundException extends RuntimeException{
    public ActiveMoveTrackerNotFoundException() {
        super("Move tracker not found");
    }
}
