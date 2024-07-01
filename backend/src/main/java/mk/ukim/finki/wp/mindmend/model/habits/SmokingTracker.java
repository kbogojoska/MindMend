package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

@Entity
@Data
public class SmokingTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int cigarettesPerDay;

    @OneToOne
    ApplicationUser applicationUser;

    @Transient
    private static final int MAX_CIGARETTES = 5;

    public SmokingTracker() {
        this.cigarettesPerDay=0;
    }

    public SmokingTracker(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        this.cigarettesPerDay=0;
    }

    public SmokingTracker(int cigarettesPerDay, ApplicationUser applicationUser) {
        this.cigarettesPerDay = cigarettesPerDay;
        this.applicationUser = applicationUser;
    }
}
