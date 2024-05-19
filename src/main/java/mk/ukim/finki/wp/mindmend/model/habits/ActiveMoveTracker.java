package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

@Entity
@Data
public class ActiveMoveTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private ApplicationUser user;

    private Integer dailyStepsGoal;

    public ActiveMoveTracker(ApplicationUser user)
    {
        this.user = user;
        dailyStepsGoal = 10000;
    }

    public ActiveMoveTracker(ApplicationUser user, Integer dailyStepsGoal) {
        this.user = user;
        this.dailyStepsGoal = dailyStepsGoal;
    }

    public ActiveMoveTracker() {
        dailyStepsGoal = 10000;
    }
}
