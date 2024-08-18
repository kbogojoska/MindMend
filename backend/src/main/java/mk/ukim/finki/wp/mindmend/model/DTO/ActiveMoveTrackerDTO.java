package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class ActiveMoveTrackerDTO {

    private Long userId;
    private Integer dailySteps;

//    public ActiveMoveTrackerDTO(Integer dailySteps) {
//        this.dailySteps = dailySteps;
//    }

//    public ActiveMoveTrackerDTO() {
//    }
}
