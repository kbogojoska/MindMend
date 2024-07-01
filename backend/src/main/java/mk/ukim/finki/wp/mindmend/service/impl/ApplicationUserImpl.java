package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.SleepTrackerNotFoundException;
import mk.ukim.finki.wp.mindmend.model.exceptions.UserNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.ApplicationUserRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationUserImpl implements ApplicationUserService {
    private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserImpl(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }


    @Override
    public List<ApplicationUser> findAllApplicationUsers() {
        return applicationUserRepository.findAll();
    }

    @Override
    public ApplicationUser findById(Long Id) {
        return applicationUserRepository.findById(Id).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public ApplicationUser create(String username, String password, String email) {
        ApplicationUser user = new ApplicationUser(username, password, email);
        return applicationUserRepository.save(user);
    }

    @Override
    public ApplicationUser edit(Long Id, String username, String password, String email) {
        ApplicationUser user = findById(Id);
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        return applicationUserRepository.save(user);
    }

    @Override
    public ApplicationUser delete(Long Id) {
        ApplicationUser user = findById(Id);
        applicationUserRepository.delete(user);
        return user;
    }
}
