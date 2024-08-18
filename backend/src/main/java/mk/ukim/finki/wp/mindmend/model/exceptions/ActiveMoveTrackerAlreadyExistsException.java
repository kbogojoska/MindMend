package mk.ukim.finki.wp.mindmend.model.exceptions;

public class ActiveMoveTrackerAlreadyExistsException extends RuntimeException{
    public ActiveMoveTrackerAlreadyExistsException() {
        super("Move tracker already exists");
    }

}
