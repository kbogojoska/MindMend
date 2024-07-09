package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Getter;

@Getter
public class SmokingTrackerDTO {
    private Integer cigarettesPerDay;
    private Integer maxCigarettesPerDay;

    public SmokingTrackerDTO(Integer cigarettesPerDay, Integer maxCigarettesPerDay) {
        this.cigarettesPerDay = cigarettesPerDay;
        this.maxCigarettesPerDay=maxCigarettesPerDay;
    }
}
