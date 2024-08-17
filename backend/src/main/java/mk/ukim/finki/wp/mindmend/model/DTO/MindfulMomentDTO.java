package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Data;

import java.time.LocalTime;
@Data
public class MindfulMomentDTO {
    private Long userId;
    private LocalTime startOfWorkShift;
    private LocalTime endOfWorkShift;
    private Double stressLevel;
}
