package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.SocialSphereDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import mk.ukim.finki.wp.mindmend.service.SocialSphereService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://iofmjaeciopfhemggjcafhdbhnebdnmo", "http://localhost:3000"})
@RequestMapping("/api/social-sphere")
public class SocialSphereController {
    private final SocialSphereService socialSphereService;

    public SocialSphereController(SocialSphereService socialSphereService) {
        this.socialSphereService = socialSphereService;
    }

    @GetMapping(value = {"/",""})
    public List<SocialSphere> findAllSocialSpheres() {
        return socialSphereService.findAllSocialSpheres();
    }

    @GetMapping("/{id}")
    public SocialSphere findById(@PathVariable Long id) {
        return socialSphereService.findById(id);
    }

    @PostMapping("/add")
    public SocialSphere create() {
        return socialSphereService.create();
    }

    @PostMapping("/edit/{id}")
    public SocialSphere edit(@PathVariable Long id,
                             @RequestBody SocialSphereDTO socialSphereDto) {
        return socialSphereService.edit(id,
                socialSphereDto.getSocialActivitySuggestions());
    }

    @DeleteMapping("/delete/{id}")
    public SocialSphere delete(@PathVariable Long id) {
        return socialSphereService.delete(id);
    }
}
