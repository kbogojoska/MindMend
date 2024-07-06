package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.HydroTrackDTO;
import mk.ukim.finki.wp.mindmend.model.habits.HydroTrack;
import mk.ukim.finki.wp.mindmend.service.HydroTrackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://iofmjaeciopfhemggjcafhdbhnebdnmo", "http://localhost:3000"})
@RequestMapping("/api/hydro-track")
public class HydroTrackController {
    private final HydroTrackService hydroTrackService;

    public HydroTrackController(HydroTrackService hydroTrackService) {
        this.hydroTrackService = hydroTrackService;
    }

    @GetMapping(value = {"/",""})
    public List<HydroTrack> findAllHydroTracks() {
        return hydroTrackService.findAllHydroTracks();
    }

    @GetMapping("/{id}")
    public HydroTrack findById(@PathVariable Long id) {
        return hydroTrackService.findById(id);
    }

    @PostMapping("/add")
    public HydroTrack create(@RequestBody HydroTrackDTO HydroTrackDto) {
        return hydroTrackService.create(
                HydroTrackDto.getNumGlassesOfWater(),
                HydroTrackDto.getPersonalGoal());
    }

    @PostMapping("/edit/{id}")
    public HydroTrack edit(@PathVariable Long id,
                              @RequestBody HydroTrackDTO HydroTrackDto) {
        return hydroTrackService.edit(
                id,
                HydroTrackDto.getNumGlassesOfWater(),
                HydroTrackDto.getPersonalGoal());
    }

    @DeleteMapping("/delete/{id}")
    public HydroTrack delete(@PathVariable Long id) {
        return hydroTrackService.delete(id);
    }
}
