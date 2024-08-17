package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.DTO.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.mapppers.ScreenTimeMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.HydroTrackNotFoundException;
import mk.ukim.finki.wp.mindmend.model.exceptions.ScreenTrackerAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.habits.ScreenTimeTracker;
import mk.ukim.finki.wp.mindmend.model.exceptions.ScreenTimeTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.ScreenTimeTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.ScreenTimeTrackerService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScreenTimeTrackerServiceImpl implements ScreenTimeTrackerService {

    private final ScreenTimeTrackerRepository screenRepository;
    @Override
    public List<ScreenTimeTracker> findAllScreenTimeTrackers() {
        return screenRepository.findAll();
    }

    @Override
    public ScreenTimeTracker findById(Long id) {
        return screenRepository.findById(id).orElseThrow(ScreenTimeTrackerNotFoundException::new);
    }

    @Override
    public ScreenTimeTracker create(LocalTime workTimeStart, LocalTime workTimeEnd, ApplicationUser user) {
        if (screenRepository.getScreenTimeTrackerByApplicationUser(user).isPresent()) {
            throw new ScreenTrackerAlreadyExistsException();
        }
        return (workTimeStart == null || workTimeEnd == null) ?
                screenRepository.save(new ScreenTimeTracker(user)) :
                screenRepository.save(new ScreenTimeTracker(user, workTimeStart, workTimeEnd));
    }

    @Override
    public ScreenTimeTracker edit(Long id, LocalTime workTimeStart, LocalTime workTimeEnd) {
        ScreenTimeTracker screenTimeTracker=screenRepository.findById(id).orElseThrow(ScreenTimeTrackerNotFoundException::new);
        screenTimeTracker.setWorkTimeStart(workTimeStart);
        screenTimeTracker.setWorkTimeEnd(workTimeEnd);
        screenTimeTracker.setNextBreakTime(screenTimeTracker.getWorkTimeStart().plusMinutes(20));
        screenTimeTracker.setEndOfBreakTime(screenTimeTracker.getNextBreakTime().plusSeconds(20));
        return screenRepository.save(screenTimeTracker);
    }

    @Override
    public ScreenTimeTracker delete(Long id, ApplicationUser applicationUser) {
        ScreenTimeTracker screenTimeTracker=screenRepository.findById(id).orElseThrow(ScreenTimeTrackerNotFoundException::new);
        screenRepository.delete(screenTimeTracker);
        create(null, null, applicationUser);
        return screenTimeTracker;
    }

    @Override
    public ScreenTimeTracker findByUser(ApplicationUser user) {
        return screenRepository.getScreenTimeTrackerByApplicationUser(user).orElseThrow(ScreenTimeTrackerNotFoundException::new);
    }


//    @Override
//    @Scheduled(fixedRate = 60000) //pravi proverka sekoja minuta dali e priblizno do posakuvanata pauza
//    public void reminderToTakeABreak(Long id) {
//        ScreenTimeTracker screenTimeTracker=findById(id);
//        ApplicationUser user=screenTimeTracker.getUser();
//        // vo slucaj break time da zavrsi se resetira za reminder da isprati naredni 20min
//        if(LocalTime.now().isAfter(screenTimeTracker.getEndOfBreakTime()))
//        {
//            screenTimeTracker.setNextBreakTime(LocalTime.now().plusMinutes(20));
//            screenTimeTracker.setEndOfBreakTime(screenTimeTracker.getNextBreakTime().plusSeconds(20));
//            notificationService.sendNotification(user.getUsername(),"Time to get back to work!");
//        }
//        // koga e vreme da napravi pauza da se isprati poraka reminder
//        if(LocalTime.now().isAfter(screenTimeTracker.getNextBreakTime()))
//        {
//            notificationService.sendNotification(user.getUsername(),"Time to take a 20-seconds break!");
//        }
//    }
}
