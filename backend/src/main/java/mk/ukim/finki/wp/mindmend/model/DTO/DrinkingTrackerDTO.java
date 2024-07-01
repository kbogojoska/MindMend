package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Getter;

@Getter
public class DrinkingTrackerDTO {
    private int numOfDrinks;

    public DrinkingTrackerDTO(int numOfDrinks) {
        this.numOfDrinks = numOfDrinks;
    }

    public DrinkingTrackerDTO() {
    }
}
