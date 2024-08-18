package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ScreenTimeDTO {
    private Long userId;
    private LocalTime workTimeStart;
    private LocalTime workTimeEnd;
    private LocalTime nextBreakTime;
    private LocalTime endOfBreakTime;

//    public ScreenTimeDTO(LocalTime workTimeStart, LocalTime workTimeEnd) {
//        this.workTimeStart = workTimeStart;
//        this.workTimeEnd = workTimeEnd;
//
//        if (workTimeStart != null) {
//            this.nextBreakTime = workTimeStart.plusMinutes(20);
//            this.endOfBreakTime = nextBreakTime.plusSeconds(20);
//        } else {
//            this.nextBreakTime = LocalTime.now().plusMinutes(20);
//            this.endOfBreakTime = this.nextBreakTime.plusSeconds(20);
//        }
//
//        if (this.endOfBreakTime.getSecond() == 0) {
//            this.endOfBreakTime = this.endOfBreakTime.minusSeconds(1);
//        }
//    }
//
//    public ScreenTimeDTO() {
//        this.nextBreakTime = LocalTime.now().plusMinutes(20);
//        this.endOfBreakTime = this.nextBreakTime.plusSeconds(20);
//    }
}
