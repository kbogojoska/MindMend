package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class MindfulMomentResponseDTO {
    private Long id;
    private String username;
    private LocalTime startOfWorkShift;
    private LocalTime endOfWorkShift;
    private Double stressLevel;
}
