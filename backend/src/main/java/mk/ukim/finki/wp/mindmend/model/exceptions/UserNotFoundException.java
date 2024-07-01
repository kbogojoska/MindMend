package mk.ukim.finki.wp.mindmend.model.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException() {
        super("User doesn't exist");
    }
}
