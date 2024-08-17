package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class SmokingTrackerDTO {
    private Long userId;
    private Integer cigarettesPerDay;
    private Integer maxCigarettesPerDay;
}
