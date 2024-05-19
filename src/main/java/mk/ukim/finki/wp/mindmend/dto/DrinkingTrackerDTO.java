package mk.ukim.finki.wp.mindmend.dto;

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
