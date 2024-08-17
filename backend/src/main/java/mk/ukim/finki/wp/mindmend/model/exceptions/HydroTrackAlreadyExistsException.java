package mk.ukim.finki.wp.mindmend.model.exceptions;

public class HydroTrackAlreadyExistsException extends RuntimeException{
    public HydroTrackAlreadyExistsException() {
        super("Hydro tracker already exists");
    }

}
