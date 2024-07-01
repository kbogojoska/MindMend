package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Getter;

@Getter
public class ActiveMoveTrackerDTO {
    private Integer dailySteps;

    public ActiveMoveTrackerDTO(Integer dailySteps) {
        this.dailySteps = dailySteps;
    }

    public ActiveMoveTrackerDTO() {
    }
}
