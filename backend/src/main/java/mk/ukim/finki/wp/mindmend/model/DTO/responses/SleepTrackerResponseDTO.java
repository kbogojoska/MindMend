package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class SleepTrackerResponseDTO {
    private Long id;
    private String username;
    private Integer recommendedSleepTime;
    private LocalTime wakeUpTime;
    private LocalTime bedTime;
}
