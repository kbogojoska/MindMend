package mk.ukim.finki.wp.mindmend.model.exceptions;

public class MindfulMomentHabitDoesNotExistException extends RuntimeException{
    public MindfulMomentHabitDoesNotExistException() {
        super("Mindful moment not found");
    }
}
