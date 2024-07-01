package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.SocialActivity;

import java.time.LocalTime;
import java.util.List;

public interface SocialActivityService {
    List<SocialActivity> findAllSocialActivities();
    SocialActivity findById(Long Id);
    SocialActivity create(String name, String description);
    SocialActivity edit(Long Id, String name, String description);
    SocialActivity delete(Long Id);
}
