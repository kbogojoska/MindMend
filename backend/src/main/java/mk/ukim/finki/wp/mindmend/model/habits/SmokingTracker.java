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
public class SmokingTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cigarettesPerDay;

    @OneToOne
    @JoinColumn(name = "application_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
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

    public SmokingTracker(Integer cigarettesPerDay, ApplicationUser applicationUser) {
        this.cigarettesPerDay = cigarettesPerDay;
        this.applicationUser = applicationUser;
        this.maxCigarettesPerDay=4;
    }
}
