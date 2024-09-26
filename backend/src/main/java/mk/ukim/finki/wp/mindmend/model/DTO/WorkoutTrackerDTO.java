package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Data;

import java.time.LocalTime;

@Data
public class WorkoutTrackerDTO {
    private Long userId;
    private Integer recommendedDurationTimeInMinutes;
    private LocalTime startWorkoutTime;
    private LocalTime endWorkoutTime;
}
