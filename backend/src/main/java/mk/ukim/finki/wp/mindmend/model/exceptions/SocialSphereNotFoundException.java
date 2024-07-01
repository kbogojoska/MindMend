package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SocialSphereNotFoundException extends RuntimeException{
    public SocialSphereNotFoundException() {
        super("Social sphere doesn't exist");
    }
}
