package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
public class SleepTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Integer recommendedSleepTime;
    private LocalTime wakeUpTime;
    private LocalTime bedTime;
    @OneToOne
    private ApplicationUser applicationUser;

    public SleepTracker() {
        this.recommendedSleepTime = 8;
    }

    public SleepTracker(ApplicationUser applicationUser, LocalTime wakeUpTime, LocalTime bedTime) {
        this.recommendedSleepTime = 8;
        this.wakeUpTime = wakeUpTime;
        this.bedTime = bedTime;
        this.applicationUser = applicationUser;
    }

    public SleepTracker(ApplicationUser applicationUser, Integer recommendedSleepTime, LocalTime wakeUpTime, LocalTime bedTime) {
        this.recommendedSleepTime = recommendedSleepTime;
        this.wakeUpTime = wakeUpTime;
        this.bedTime = bedTime;
        this.applicationUser = applicationUser;
    }
}
