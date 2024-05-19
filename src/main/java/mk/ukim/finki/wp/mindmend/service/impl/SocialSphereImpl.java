package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import mk.ukim.finki.wp.mindmend.model.exceptions.SocialSphereNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.SocialActivityRepository;
import mk.ukim.finki.wp.mindmend.repository.SocialSphereRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.service.SocialSphereService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialSphereImpl implements SocialSphereService {

    private final SocialSphereRepository socialSphereRepository;
    private final ApplicationUserService applicationUserService;
    private final SocialActivityRepository socialActivityRepository;

    public SocialSphereImpl(SocialSphereRepository socialSphereRepository,
                            ApplicationUserService applicationUserService,
                            SocialActivityRepository socialActivityRepository) {
        this.socialSphereRepository = socialSphereRepository;
        this.applicationUserService = applicationUserService;
        this.socialActivityRepository = socialActivityRepository;
    }

    @Override
    public List<SocialSphere> findAllSocialSpheres() {
        return socialSphereRepository.findAll();
    }

    @Override
    public SocialSphere findById(Long Id) {
        return socialSphereRepository.findById(Id).orElseThrow(SocialSphereNotFoundException::new);
    }

    @Override
    public SocialSphere create() {
        // for testing method can run only once because of the one to one relation
        // will be logged user later
        ApplicationUser user = applicationUserService.create("pip", "pip.m.com", "123");
        //
        List<SocialActivity> activities = socialActivityRepository
                .findAll()
                .stream()
                .limit(5)
                .toList();
        return socialSphereRepository.save(new SocialSphere(activities, user));
    }

    @Override
    public SocialSphere edit(Long Id, List<SocialActivity> socialActivities) {
        SocialSphere socialSphere = findById(Id);
        socialSphere.setSocialActivitySuggestions(socialActivities);
        return socialSphereRepository.save(socialSphere);
    }

    @Override
    public SocialSphere delete(Long Id) {
        SocialSphere socialSphere = findById(Id);
        socialSphereRepository.delete(socialSphere);
        return socialSphere;
    }
}
