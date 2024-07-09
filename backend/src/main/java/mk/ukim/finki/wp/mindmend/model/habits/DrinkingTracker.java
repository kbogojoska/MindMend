package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrinkingTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numOfDrinks;
    @OneToOne
    ApplicationUser applicationUser;

    private Integer maxDrinks;

    public DrinkingTracker(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        this.numOfDrinks=0;
        this.maxDrinks=0;
    }

    public DrinkingTracker(Integer numOfDrinks, Integer maxDrinks, ApplicationUser applicationUser) {
        this.numOfDrinks = numOfDrinks;
        this.maxDrinks=maxDrinks;
        this.applicationUser = applicationUser;
    }
}
