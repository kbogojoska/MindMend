package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HydroTrackerResponseDTO {
    private Long id;
    private String username;
    private Integer numGlassesOfWater;
    private Integer personalGoal;
}
