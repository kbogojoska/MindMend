package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private ApplicationUser applicationUser;

    public HydroTrack(Integer numGlassesOfWater, Integer personalGoal, ApplicationUser applicationUser) {
        this.numGlassesOfWater = numGlassesOfWater;
        this.personalGoal = personalGoal;
        this.applicationUser = applicationUser;
    }

    public HydroTrack(Integer numGlassesOfWater, ApplicationUser applicationUser) {
        this.numGlassesOfWater = numGlassesOfWater;
        this.applicationUser = applicationUser;
    }
}
