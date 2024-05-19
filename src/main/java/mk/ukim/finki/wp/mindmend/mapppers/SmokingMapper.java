package mk.ukim.finki.wp.mindmend.mapppers;

import mk.ukim.finki.wp.mindmend.model.DTO.SmokingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SmokingTracker;

import java.util.ArrayList;
import java.util.List;

public class SmokingMapper {
    public static SmokingTrackerDTO MapToViewModel(SmokingTracker smokingTracker)
    {
        return new SmokingTrackerDTO(
                smokingTracker.getCigarettesPerDay()
        );
    }
    public static List<SmokingTrackerDTO> MapToListViewModel(List<SmokingTracker> smokingTrackers){
        List<SmokingTrackerDTO> smokingTrackerDTOS = new ArrayList<>();
        for (var s : smokingTrackers){
            smokingTrackerDTOS.add(MapToViewModel(s));
        }
        return smokingTrackerDTOS;
    }
}
