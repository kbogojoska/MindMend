package mk.ukim.finki.wp.mindmend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.wp.mindmend.dto.ScreenTimeDTO;
import mk.ukim.finki.wp.mindmend.mapppers.ScreenTimeMapper;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.ScreenTimeTracker;
import mk.ukim.finki.wp.mindmend.model.exceptions.ScreenTimeTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.ScreenTimeTrackerRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.ScreenTimeTrackerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScreenTimeTrackerServiceImpl implements ScreenTimeTrackerService {

    private final ScreenTimeTrackerRepository screenRepository;
    private final ApplicationUserService applicationUserService;

    @Override
    public List<ScreenTimeDTO> findAllScreenTimeTrackers() {
        return ScreenTimeMapper.MapToListViewModel(screenRepository.findAll());
    }

    @Override
    public ScreenTimeDTO findById(Long id) {
        return ScreenTimeMapper.MapToViewModel(screenRepository.findById(id).orElseThrow(ScreenTimeTrackerNotFoundException::new));
    }

    @Override
    public ScreenTimeTracker create(ScreenTimeDTO screenTimeDTO) {
        ApplicationUser user = applicationUserService.create("new", "741", "new@gmail.com");
        if(screenTimeDTO.getWorkTimeStart()==null && screenTimeDTO.getWorkTimeEnd()==null)
        {
            return screenRepository.save(new ScreenTimeTracker(user));
        }
        else
            return screenRepository.save(new ScreenTimeTracker(user,screenTimeDTO.getWorkTimeStart(),screenTimeDTO.getWorkTimeEnd()));
    }

    @Override
    public ScreenTimeTracker edit(Long id, ScreenTimeDTO screenTimeDTO) {
        ScreenTimeTracker screenTimeTracker=screenRepository.findById(id).orElseThrow(ScreenTimeTrackerNotFoundException::new);
        screenTimeTracker.setWorkTimeStart(screenTimeDTO.getWorkTimeStart());
        screenTimeTracker.setWorkTimeEnd(screenTimeDTO.getWorkTimeEnd());
        screenTimeTracker.setNextBreakTime(screenTimeDTO.getNextBreakTime());
        screenTimeTracker.setEndOfBreakTime(screenTimeDTO.getEndOfBreakTime());
        return screenRepository.save(screenTimeTracker);
    }

    @Override
    public ScreenTimeTracker delete(Long id) {
        ScreenTimeTracker screenTimeTracker=screenRepository.findById(id).orElseThrow(ScreenTimeTrackerNotFoundException::new);
        screenRepository.delete(screenTimeTracker);
        return screenTimeTracker;
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
