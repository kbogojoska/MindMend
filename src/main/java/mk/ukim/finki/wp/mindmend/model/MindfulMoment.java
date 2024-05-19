package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private ApplicationUser applicationUser;

    public MindfulMoment(ApplicationUser applicationUser, LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel) {
        this.applicationUser = applicationUser;
        this.startOfWorkShift = startOfWorkShift;
        this.endOfWorkShift = endOfWorkShift;
        this.stressLevel = stressLevel;
    }
}
