package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DrinkingTrackerResponseDTO {
    private Long id;
    private String username;
    private Integer numOfDrinks;
    private Integer maxDrinks;
}
