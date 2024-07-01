package mk.ukim.finki.wp.mindmend.mapppers;

import mk.ukim.finki.wp.mindmend.model.DTO.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;

import java.util.ArrayList;
import java.util.List;

public class ScreenTimeMapper {
    public static ScreenTimeDTO MapToViewModel(ScreenTimeTracker screenTracker)
    {
        return new ScreenTimeDTO(
                screenTracker.getNextBreakTime(),
                screenTracker.getEndOfBreakTime()
        );
    }
    public static List<ScreenTimeDTO> MapToListViewModel(List<ScreenTimeTracker> screenTrackers){
        List<ScreenTimeDTO> screenTimeDTOS = new ArrayList<>();
        for (var s : screenTrackers){
            screenTimeDTOS.add(MapToViewModel(s));
        }
        return screenTimeDTOS;
    }
}
