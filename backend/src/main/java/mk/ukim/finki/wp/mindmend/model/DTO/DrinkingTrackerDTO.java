package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Getter;

@Getter
public class DrinkingTrackerDTO {
    private Integer numOfDrinks;
    private Integer maxDrinks;

    public DrinkingTrackerDTO(Integer numOfDrinks, Integer maxDrinks) {
        this.numOfDrinks = numOfDrinks;
        this.maxDrinks=maxDrinks;
    }
}
