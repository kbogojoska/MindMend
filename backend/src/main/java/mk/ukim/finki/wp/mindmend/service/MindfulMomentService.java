package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.model.habits.MindfulMoment;

import java.time.LocalTime;
import java.util.List;

public interface MindfulMomentService {
    List<MindfulMoment> findAllMindfulMoments();
    MindfulMoment findById(Long Id);
    MindfulMoment create(LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel, ApplicationUser user);
    MindfulMoment edit(Long Id, LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel);
    MindfulMoment delete(Long Id, ApplicationUser applicationUser);
    MindfulMoment findByUser(ApplicationUser user);
}
