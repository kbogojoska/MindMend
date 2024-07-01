package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;
import mk.ukim.finki.wp.mindmend.model.exceptions.SocialActivityDoesNotExistException;
import mk.ukim.finki.wp.mindmend.repository.SocialActivityRepository;
import mk.ukim.finki.wp.mindmend.repository.SocialSphereRepository;
import mk.ukim.finki.wp.mindmend.service.SocialActivityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialActivityImpl implements SocialActivityService {

    private final SocialActivityRepository socialActivityRepository;
    private final SocialSphereRepository socialSphereRepository;

    public SocialActivityImpl(SocialActivityRepository socialActivityRepository,
                              SocialSphereRepository socialSphereRepository) {
        this.socialActivityRepository = socialActivityRepository;
        this.socialSphereRepository = socialSphereRepository;
    }

    @Override
    public List<SocialActivity> findAllSocialActivities() {
        return socialActivityRepository.findAll();
    }

    @Override
    public SocialActivity findById(Long Id) {
        return socialActivityRepository.findById(Id).orElseThrow(SocialActivityDoesNotExistException::new);
    }

    @Override
    public SocialActivity create(String name, String description) {
        SocialActivity socialActivity = new SocialActivity(name, description);
        socialActivityRepository.save(socialActivity);
        addActivityToAllSpheres(socialActivity);
        return socialActivity;
    }

    @Override
    public SocialActivity edit(Long Id, String name, String description) {
        SocialActivity socialActivity = findById(Id);
        socialActivity.setName(name);
        socialActivity.setDescription(description);
        return socialActivityRepository.save(socialActivity);
    }

    @Override
    public SocialActivity delete(Long Id) {
        SocialActivity socialActivity = findById(Id);
        socialActivityRepository.delete(socialActivity);
        return socialActivity;
    }

    private void addActivityToAllSpheres(SocialActivity socialActivity) {
        List<SocialSphere> allSpheres = socialSphereRepository.findAll();
        for (SocialSphere sphere : allSpheres) {
            sphere.getSocialActivitySuggestions().add(socialActivity);
            socialSphereRepository.save(sphere);
        }
    }
}
