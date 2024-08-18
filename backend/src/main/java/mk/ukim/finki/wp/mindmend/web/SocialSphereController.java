package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.SocialSphereDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.SocialSphereResponseDTO;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.SocialSphereService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin({"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"})
@RequestMapping("/api/social-sphere")
public class SocialSphereController {
    private final SocialSphereService socialSphereService;
    private final ApplicationUserService applicationUserService;

    public SocialSphereController(SocialSphereService socialSphereService, ApplicationUserService applicationUserService) {
        this.socialSphereService = socialSphereService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping(value = {"/",""})
    public List<SocialSphereResponseDTO> findAllSocialSpheres() {
        List<SocialSphere> socialSphere = socialSphereService.findAllSocialSpheres();
        return socialSphere.stream().map(sphere -> new SocialSphereResponseDTO(sphere.getId(),
                sphere.getApplicationUser().getUsername(),
                sphere.getPickOfTheDay(sphere.getApplicationUser().getId())))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SocialSphereResponseDTO> findById(@PathVariable Long id) {
        SocialSphere socialSphere = socialSphereService.findById(id);
        SocialSphereResponseDTO socialSphereResponseDTO = new SocialSphereResponseDTO(
                socialSphere.getId(),
                socialSphere.getApplicationUser().getUsername(),
                socialSphere.getPickOfTheDay(socialSphere.getApplicationUser().getId())
        );
        return ResponseEntity.ok(socialSphereResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<SocialSphereResponseDTO> getHydroTrackersByUserId(@PathVariable Long userId) {
        SocialSphere socialSphere = socialSphereService.findByUser(applicationUserService.findById(userId));
        SocialSphereResponseDTO socialSphereResponseDTO = new SocialSphereResponseDTO(
                socialSphere.getId(),
                socialSphere.getApplicationUser().getUsername(),
                socialSphere.getPickOfTheDay(socialSphere.getApplicationUser().getId())
        );
        return ResponseEntity.ok(socialSphereResponseDTO);
    }

    @PostMapping("/add")
    public SocialSphere create(@RequestBody SocialSphereDTO socialSphereDTO) {
        return socialSphereService.create(applicationUserService.findById(socialSphereDTO.getUserId()));
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<SocialSphereResponseDTO> edit(@PathVariable Long id,
                                                        @RequestBody SocialSphereDTO socialSphereDto) {
        SocialSphere socialSphere = socialSphereService.edit(id,
                            socialSphereDto.getSocialActivitySuggestions());

        SocialSphereResponseDTO socialSphereResponseDTO = new SocialSphereResponseDTO(
                socialSphere.getId(),
                socialSphere.getApplicationUser().getUsername(),
                socialSphere.getPickOfTheDay(socialSphere.getApplicationUser().getId())
        );
        return ResponseEntity.ok(socialSphereResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public SocialSphere delete(@PathVariable Long id) {
        ApplicationUser applicationUser = socialSphereService.findById(id).getApplicationUser();
        return socialSphereService.delete(id, applicationUser);
    }
}
