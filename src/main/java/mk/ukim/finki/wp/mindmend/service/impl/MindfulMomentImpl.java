package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.MindfulMoment;
import mk.ukim.finki.wp.mindmend.model.exceptions.MindfulMomentHabitDoesNotExistException;
import mk.ukim.finki.wp.mindmend.repository.MindfulMomentRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.MindfulMomentService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class MindfulMomentImpl implements MindfulMomentService {

    private final MindfulMomentRepository mindfulMomentRepository;
    private final ApplicationUserService applicationUserService;

    public MindfulMomentImpl(MindfulMomentRepository mindfulMomentRepository,
                             ApplicationUserService applicationUserService) {
        this.mindfulMomentRepository = mindfulMomentRepository;
        this.applicationUserService = applicationUserService;
    }

    @Override
    public List<MindfulMoment> findAllMindfulMoments() {
        return mindfulMomentRepository.findAll();
    }

    @Override
    public MindfulMoment findById(Long Id) {
        return mindfulMomentRepository.findById(Id).orElseThrow(MindfulMomentHabitDoesNotExistException::new);
    }

    @Override
    public MindfulMoment create(LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel) {
        // for testing method can run only once because of the one to one relation
        // will be logged user later
        ApplicationUser user = applicationUserService.create("pip", "pip.m.com", "123");
        //
        return mindfulMomentRepository.save(new MindfulMoment(user,startOfWorkShift, endOfWorkShift, stressLevel));
    }

    @Override
    public MindfulMoment edit(Long Id, LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel) {
        MindfulMoment moment = findById(Id);
        moment.setStartOfWorkShift(startOfWorkShift);
        moment.setEndOfWorkShift(endOfWorkShift);
        moment.setStressLevel(stressLevel);
        return mindfulMomentRepository.save(moment);
    }

    @Override
    public MindfulMoment delete(Long Id) {
        MindfulMoment moment = findById(Id);
        mindfulMomentRepository.delete(moment);
        return moment;
    }
}
