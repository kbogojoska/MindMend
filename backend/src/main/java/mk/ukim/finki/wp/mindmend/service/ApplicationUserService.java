package mk.ukim.finki.wp.mindmend.service;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;

import java.time.LocalTime;
import java.util.List;

public interface ApplicationUserService {
    List<ApplicationUser> findAllApplicationUsers();
    ApplicationUser findById(Long Id);
    ApplicationUser create(String username, String password, String email);
    ApplicationUser edit(Long Id, String username, String password, String email);
    ApplicationUser delete(Long Id);
    ApplicationUser findByUsername(String username);
    ApplicationUser login(String email, String password);
}
