package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Data;

import java.time.LocalTime;
@Data
public class SleepTrackerDTO {
    private Long userId;
    private Integer recommendedSleepTime;
    private LocalTime wakeUpTime;
    private LocalTime bedTime;
}
