package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.model.habits.SocialSphere;

import java.util.List;

public interface SocialSphereService {
    List<SocialSphere> findAllSocialSpheres();
    SocialSphere findById(Long Id);
    SocialSphere create(ApplicationUser user);
    SocialSphere edit(Long Id, List<SocialActivity> socialActivities);
    SocialSphere delete(Long Id, ApplicationUser applicationUser);
    SocialSphere findByUser(ApplicationUser user);
}
