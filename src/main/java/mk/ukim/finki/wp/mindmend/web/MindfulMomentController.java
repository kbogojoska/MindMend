package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.MindfulMomentDTO;
import mk.ukim.finki.wp.mindmend.model.habits.MindfulMoment;
import mk.ukim.finki.wp.mindmend.service.MindfulMomentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mindful-moment")
public class MindfulMomentController {
    private final MindfulMomentService mindfulMomentService;

    public MindfulMomentController(MindfulMomentService mindfulMomentService) {
        this.mindfulMomentService = mindfulMomentService;
    }

    @GetMapping(value = {"/",""})
    public List<MindfulMoment> findAllMindfulMoments() {
        return mindfulMomentService.findAllMindfulMoments();
    }

    @GetMapping("/{id}")
    public MindfulMoment findById(@PathVariable Long id) {
        return mindfulMomentService.findById(id);
    }

    @PostMapping("/add")
    public MindfulMoment create(@RequestBody MindfulMomentDTO MindfulMomentDto) {
        return mindfulMomentService.create(
                MindfulMomentDto.getStartOfWorkShift(),
                MindfulMomentDto.getEndOfWorkShift(),
                MindfulMomentDto.getStressLevel());
    }

    @PostMapping("/edit/{id}")
    public MindfulMoment edit(@PathVariable Long id,
                             @RequestBody MindfulMomentDTO MindfulMomentDto) {
        return mindfulMomentService.edit(
                id,
                MindfulMomentDto.getStartOfWorkShift(),
                MindfulMomentDto.getEndOfWorkShift(),
                MindfulMomentDto.getStressLevel());
    }

    @DeleteMapping("/delete/{id}")
    public MindfulMoment delete(@PathVariable Long id) {
        return mindfulMomentService.delete(id);
    }
}
