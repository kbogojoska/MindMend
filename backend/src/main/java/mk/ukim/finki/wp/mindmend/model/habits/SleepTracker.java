package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JoinColumn(name = "application_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
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
    public SleepTracker(ApplicationUser applicationUser) {
        this.recommendedSleepTime = 8;
        this.wakeUpTime = LocalTime.of(6,0,0);
        this.bedTime = LocalTime.of(22,0,0);
        this.applicationUser = applicationUser;
    }
}
