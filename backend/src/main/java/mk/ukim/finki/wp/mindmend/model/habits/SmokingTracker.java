package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmokingTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cigarettesPerDay;

    @OneToOne
    ApplicationUser applicationUser;

    private Integer maxCigarettesPerDay;


    public SmokingTracker(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        this.cigarettesPerDay=0;
        this.maxCigarettesPerDay=0;
    }

    public SmokingTracker(Integer cigarettesPerDay, Integer maxCigarettesPerDay, ApplicationUser applicationUser) {
        this.cigarettesPerDay = cigarettesPerDay;
        this.applicationUser = applicationUser;
        this.maxCigarettesPerDay=maxCigarettesPerDay;
    }
}
