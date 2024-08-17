package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class DrinkingTrackerDTO {
    private Long userId;
    private Integer numOfDrinks;
    private Integer maxDrinks;
}
