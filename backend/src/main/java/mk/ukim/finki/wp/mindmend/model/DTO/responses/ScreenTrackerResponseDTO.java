package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ScreenTrackerResponseDTO {
    private Long id;
    private String username;
    private LocalTime workTimeStart;
    private LocalTime workTimeEnd;
    private LocalTime nextBreakTime;
    private LocalTime endOfBreakTime;
}
