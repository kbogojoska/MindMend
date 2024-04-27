package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class SleepTracker extends Habit {
    private Integer recommendedSleepTime;
    private LocalTime wakeUpTime;
    private LocalTime bedTime;

    public SleepTracker() {
        this.recommendedSleepTime = 8;
    }

    public SleepTracker(ApplicationUser applicationUser, LocalTime wakeUpTime, LocalTime bedTime) {
        super(applicationUser);
        this.recommendedSleepTime = 8;
        this.wakeUpTime = wakeUpTime;
        this.bedTime = bedTime;
    }

    public SleepTracker(ApplicationUser applicationUser, Integer recommendedSleepTime, LocalTime wakeUpTime, LocalTime bedTime) {
        super(applicationUser);
        this.recommendedSleepTime = 8;
        this.wakeUpTime = wakeUpTime;
        this.bedTime = bedTime;
    }
}
