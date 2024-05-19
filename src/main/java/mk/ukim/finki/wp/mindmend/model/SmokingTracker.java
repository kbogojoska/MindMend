package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.Data;

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
        super();
        this.applicationUser = applicationUser;
        this.cigarettesPerDay=0;
    }

    public SmokingTracker(int cigarettesPerDay, ApplicationUser applicationUser) {
        this.cigarettesPerDay = cigarettesPerDay;
        this.applicationUser = applicationUser;
    }
}
