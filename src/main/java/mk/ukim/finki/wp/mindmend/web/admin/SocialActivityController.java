package mk.ukim.finki.wp.mindmend.web.admin;

import mk.ukim.finki.wp.mindmend.model.DTO.admin.SocialActivityDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.admin.SocialActivityDTO;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.service.SocialActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/social-activity")
public class SocialActivityController {
    private final SocialActivityService socialActivityService;

    public SocialActivityController(SocialActivityService socialActivityService) {
        this.socialActivityService = socialActivityService;
    }

    @GetMapping("/all")
    public List<SocialActivity> findAllSocialActivities() {
        return socialActivityService.findAllSocialActivities();
    }

    @GetMapping("/{id}")
    public SocialActivity findById(@PathVariable Long id) {
        return socialActivityService.findById(id);
    }

    @PostMapping("/add")
    public SocialActivity create(@RequestBody SocialActivityDTO socialActivityDTO) {
        return socialActivityService.create(
                socialActivityDTO.getName(),
                socialActivityDTO.getDescription()
        );
    }

    @PostMapping("/edit/{id}")
    public SocialActivity edit(@PathVariable Long id,
                               @RequestBody SocialActivityDTO socialActivityDTO) {
        return socialActivityService.edit(id,
                socialActivityDTO.getName(),
                socialActivityDTO.getDescription());
    }

    @DeleteMapping("/delete/{id}")
    public SocialActivity delete(@PathVariable Long id) {
        return socialActivityService.delete(id);
    }
}
