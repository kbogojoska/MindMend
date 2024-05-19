package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SocialActivityDoesNotExistException extends RuntimeException{
    public SocialActivityDoesNotExistException() {
        super("Social activity doesn't exist");
    }
}
