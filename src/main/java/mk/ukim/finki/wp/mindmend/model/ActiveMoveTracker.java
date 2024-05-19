package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.Data;

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
        super();
        dailyStepsGoal = 10000;
    }

    public ActiveMoveTracker(ApplicationUser user,Integer dailyStepsGoal) {
        super();
        this.dailyStepsGoal = dailyStepsGoal;
    }

    public ActiveMoveTracker() {
        dailyStepsGoal = 10000;
    }
}
