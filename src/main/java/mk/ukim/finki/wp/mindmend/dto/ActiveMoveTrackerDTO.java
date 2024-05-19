package mk.ukim.finki.wp.mindmend.dto;

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
