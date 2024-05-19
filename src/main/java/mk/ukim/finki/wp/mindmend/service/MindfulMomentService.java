package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.MindfulMoment;

import java.time.LocalTime;
import java.util.List;

public interface MindfulMomentService {
    List<MindfulMoment> findAllMindfulMoments();
    MindfulMoment findById(Long Id);
    MindfulMoment create(LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel);
    MindfulMoment edit(Long Id, LocalTime startOfWorkShift, LocalTime endOfWorkShift, Double stressLevel);
    MindfulMoment delete(Long Id);
}
