package mk.ukim.finki.wp.mindmend.dto;

import lombok.Getter;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

import java.time.LocalTime;

@Getter
public class ScreenTimeDTO {
    private LocalTime workTimeStart;
    private LocalTime workTimeEnd;
    private LocalTime nextBreakTime;
    private LocalTime endOfBreakTime;

    public ScreenTimeDTO(LocalTime workTimeStart, LocalTime workTimeEnd) {
        this.workTimeStart = workTimeStart;
        this.workTimeEnd = workTimeEnd;

        if (workTimeStart != null) {
            this.nextBreakTime = workTimeStart.plusMinutes(20);
            this.endOfBreakTime = this.nextBreakTime.plusSeconds(20);
        } else {
            this.nextBreakTime = LocalTime.now().plusMinutes(20);
            this.endOfBreakTime = this.nextBreakTime.plusSeconds(20);
        }
    }

    public ScreenTimeDTO() {
        this.nextBreakTime = LocalTime.now().plusMinutes(20);
        this.endOfBreakTime = this.nextBreakTime.plusSeconds(20);
    }
}
