package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class WorkoutTrackerResponseDTO {
    private Long id;
    private String username;
    private Integer recommendedDurationTimeInMinutes;
    private LocalTime startWorkoutTime;
    private LocalTime endWorkoutTime;
}
