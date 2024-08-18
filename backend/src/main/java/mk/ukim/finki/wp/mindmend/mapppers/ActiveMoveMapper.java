package mk.ukim.finki.wp.mindmend.mapppers;

import mk.ukim.finki.wp.mindmend.model.DTO.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.ActiveMoveTracker;

import java.util.ArrayList;
import java.util.List;

public class ActiveMoveMapper {
    public static ActiveMoveTrackerDTO MapToViewModel(ActiveMoveTracker moveTracker)
    {
        return new ActiveMoveTrackerDTO(
                moveTracker.getUser().getId(),
                moveTracker.getDailyStepsGoal()
        );
    }
    public static List<ActiveMoveTrackerDTO> MapToListViewModel(List<ActiveMoveTracker> moveTrackers){
        List<ActiveMoveTrackerDTO> moveTrackerDTOS = new ArrayList<>();
        for (var a : moveTrackers){
            moveTrackerDTOS.add(MapToViewModel(a));
        }
        return moveTrackerDTOS;
    }
}
