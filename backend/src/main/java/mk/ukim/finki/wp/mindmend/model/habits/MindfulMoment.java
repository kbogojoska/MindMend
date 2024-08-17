package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MindfulMoment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private LocalTime startOfWorkShift;
    private LocalTime endOfWorkShift;
    private static Integer workTimeLimit = 8;
    private Double stressLevel;
    private static Integer stressLevelLimit = 4;
    @OneToOne
    @JoinColumn(name = "application_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ApplicationUser applicationUser;

    public MindfulMoment(ApplicationUser applicationUser, LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel) {
        this.applicationUser = applicationUser;
        this.startOfWorkShift = startOfWorkShift;
        this.endOfWorkShift = endOfWorkShift;
        this.stressLevel = stressLevel;
    }

    public MindfulMoment(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        this.startOfWorkShift = LocalTime.of(9,0,0);
        this.endOfWorkShift = LocalTime.of(17,0,0);
        this.stressLevel = 0.0;
    }
}
