package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

import java.time.LocalTime;

@Entity
@Data
public class ScreenTimeTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalTime nextBreakTime;
    private LocalTime endOfBreakTime;
    private LocalTime workTimeStart;
    private LocalTime workTimeEnd;

    @OneToOne
    private ApplicationUser applicationUser;

    public void calculateBreakTime() {
        this.nextBreakTime = LocalTime.now().plusMinutes(20);
        this.endOfBreakTime = nextBreakTime.plusSeconds(20);
    }

    public ScreenTimeTracker() {
        calculateBreakTime();
    }

    public ScreenTimeTracker(ApplicationUser user) {
        this.applicationUser = user;
        calculateBreakTime();
    }

    public ScreenTimeTracker(ApplicationUser applicationUser, LocalTime workTimeStart, LocalTime workTimeEnd) {
        this.applicationUser = applicationUser;
        this.workTimeStart = workTimeStart;
        this.workTimeEnd = workTimeEnd;
        this.nextBreakTime = workTimeStart.plusMinutes(20);
        this.endOfBreakTime = nextBreakTime.plusSeconds(20);
    }
}
