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
public class WorkoutTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Integer recommendedDurationTimeInMinutes;
    private LocalTime startWorkoutTime;
    private LocalTime endWorkoutTime;

    @OneToOne
    @JoinColumn(name = "application_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ApplicationUser applicationUser;

    public WorkoutTracker() {
        this.recommendedDurationTimeInMinutes = 90;
    }

    public WorkoutTracker(ApplicationUser applicationUser, LocalTime startWorkoutTime, LocalTime endWorkoutTime) {
        this.recommendedDurationTimeInMinutes = 90;
        this.startWorkoutTime = startWorkoutTime;
        this.endWorkoutTime = endWorkoutTime;
        this.applicationUser = applicationUser;
    }

    public WorkoutTracker(ApplicationUser applicationUser, Integer recommendedDurationTimeInMinutes, LocalTime startWorkoutTime, LocalTime endWorkoutTime) {
        this.recommendedDurationTimeInMinutes = recommendedDurationTimeInMinutes;
        this.startWorkoutTime = startWorkoutTime;
        this.endWorkoutTime = endWorkoutTime;
        this.applicationUser = applicationUser;
    }
    public WorkoutTracker(ApplicationUser applicationUser) {
        this.recommendedDurationTimeInMinutes = 90;
        this.startWorkoutTime = LocalTime.of(6,0,0);
        this.endWorkoutTime = LocalTime.of(7,0,0);
        this.applicationUser = applicationUser;
    }
}
