package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.MindfulMomentAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.habits.MindfulMoment;
import mk.ukim.finki.wp.mindmend.model.exceptions.MindfulMomentHabitDoesNotExistException;
import mk.ukim.finki.wp.mindmend.repository.MindfulMomentRepository;
import mk.ukim.finki.wp.mindmend.service.MindfulMomentService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class MindfulMomentImpl implements MindfulMomentService {

    private final MindfulMomentRepository mindfulMomentRepository;
    public MindfulMomentImpl(MindfulMomentRepository mindfulMomentRepository) {
        this.mindfulMomentRepository = mindfulMomentRepository;
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
    public MindfulMoment create(LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel, ApplicationUser user) {
        if (mindfulMomentRepository.getMindfulMomentsByApplicationUser(user).isPresent()) {
            throw new MindfulMomentAlreadyExistsException();
        }
        return (startOfWorkShift == null && endOfWorkShift == null && stressLevel == null) ?
                mindfulMomentRepository.save(new MindfulMoment(user)) :
                mindfulMomentRepository.save(new MindfulMoment(user, startOfWorkShift, endOfWorkShift, stressLevel));
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
    public MindfulMoment delete(Long Id, ApplicationUser applicationUser) {
        MindfulMoment moment = findById(Id);
        mindfulMomentRepository.delete(moment);
        create(null, null, null, applicationUser);
        return moment;
    }

    @Override
    public MindfulMoment findByUser(ApplicationUser user) {
        return mindfulMomentRepository.getMindfulMomentsByApplicationUser(user).orElseThrow(MindfulMomentHabitDoesNotExistException::new);
    }
}
