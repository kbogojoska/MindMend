package mk.ukim.finki.wp.mindmend.model.exceptions;

public class UserDoesNotExistException extends RuntimeException{
    public UserDoesNotExistException() {
        super("User does not exist.");
    }
}
