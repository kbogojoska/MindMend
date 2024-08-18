package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HydroTrack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Integer numGlassesOfWater;
    private static Integer goal = 8;
    private Integer personalGoal;
    @OneToOne
    @JoinColumn(name = "application_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ApplicationUser applicationUser;

    public HydroTrack(Integer numGlassesOfWater, Integer personalGoal, ApplicationUser applicationUser) {
        this.numGlassesOfWater = numGlassesOfWater;
        this.personalGoal = personalGoal;
        this.applicationUser = applicationUser;
    }

    public HydroTrack(Integer numGlassesOfWater, ApplicationUser applicationUser) {
        this.numGlassesOfWater = numGlassesOfWater;
        this.personalGoal = goal;
        this.applicationUser = applicationUser;
    }

    public HydroTrack(ApplicationUser applicationUser) {
        this.numGlassesOfWater = 0;
        this.personalGoal = goal;
        this.applicationUser = applicationUser;
    }
}
