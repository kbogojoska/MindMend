package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SocialSphereAlreadyExistsException extends RuntimeException{
    public SocialSphereAlreadyExistsException() {
        super("Social sphere already exists");
    }
}
