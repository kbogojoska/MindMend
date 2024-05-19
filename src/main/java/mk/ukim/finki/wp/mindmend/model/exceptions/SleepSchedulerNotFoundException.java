package mk.ukim.finki.wp.mindmend.model.exceptions;

public class SleepSchedulerNotFoundException extends RuntimeException{
    public SleepSchedulerNotFoundException() {
        super("Sleep Scheduler not found");
    }
}
