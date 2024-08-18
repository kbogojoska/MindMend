package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.model.exceptions.SocialSphereAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import mk.ukim.finki.wp.mindmend.model.exceptions.SocialSphereNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.SocialActivityRepository;
import mk.ukim.finki.wp.mindmend.repository.SocialSphereRepository;
import mk.ukim.finki.wp.mindmend.service.SocialSphereService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialSphereImpl implements SocialSphereService {

    private final SocialSphereRepository socialSphereRepository;
    private final SocialActivityRepository socialActivityRepository;

    public SocialSphereImpl(SocialSphereRepository socialSphereRepository,
                            SocialActivityRepository socialActivityRepository) {
        this.socialSphereRepository = socialSphereRepository;
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
    public SocialSphere create(ApplicationUser user) {
        if (socialSphereRepository.getSocialSphereByApplicationUser(user).isPresent()) {
            throw new SocialSphereAlreadyExistsException();
        }
        List<SocialActivity> activities = socialActivityRepository
                .findAll()
                .stream()
                .limit(50)
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
    public SocialSphere delete(Long Id, ApplicationUser applicationUser) {
        SocialSphere socialSphere = findById(Id);
        socialSphereRepository.delete(socialSphere);
        create(applicationUser);
        return socialSphere;
    }

    @Override
    public SocialSphere findByUser(ApplicationUser user) {
        return socialSphereRepository.getSocialSphereByApplicationUser(user).orElseThrow(SocialSphereNotFoundException::new);
    }
}
