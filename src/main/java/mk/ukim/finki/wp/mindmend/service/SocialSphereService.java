package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import mk.ukim.finki.wp.mindmend.model.SocialSphere;

import java.time.LocalTime;
import java.util.List;

public interface SocialSphereService {
    List<SocialSphere> findAllSocialSpheres();
    SocialSphere findById(Long Id);
    SocialSphere create();
    SocialSphere edit(Long Id, List<SocialActivity> socialActivities);
    SocialSphere delete(Long Id);
}
