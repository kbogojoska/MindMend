package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

import java.time.LocalTime;
@Data
public class SleepTrackerDto {
//    private Long userId;
    private Integer recommendedSleepTime;
    private LocalTime wakeUpTime;
    private LocalTime bedTime;
}
