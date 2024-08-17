package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.UserDoesNotExistException;
import mk.ukim.finki.wp.mindmend.model.exceptions.UserNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.ApplicationUserRepository;
import mk.ukim.finki.wp.mindmend.service.*;
import mk.ukim.finki.wp.mindmend.model.exceptions.UsernameAlreadyExistsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationUserServiceImpl implements ApplicationUserService, UserDetailsService {
    private final ApplicationUserRepository applicationUserRepository;
    private final HydroTrackService hydroTrackService;
    private final ActiveMoveTrackerService activeMoveTrackerService;
    private final SmokingTrackerService smokingTrackerService;
    private final DrinkingTrackerService drinkingTrackerService;
    private final MealPlannerService mealPlannerService;
    private final ScreenTimeTrackerService screenTimeTrackerService;
    private final SleepTrackerService sleepTrackerService;
    private final MindfulMomentService mindfulMomentService;
    private final SocialSphereService socialSphereService;
    private final PasswordEncoder passwordEncoder;


    private static final Logger logger = LoggerFactory.getLogger(ApplicationUserServiceImpl.class);

    public ApplicationUserServiceImpl(ApplicationUserRepository applicationUserRepository,
                                      HydroTrackService hydroTrackService,
                                      ActiveMoveTrackerService activeMoveTrackerService,
                                      SmokingTrackerService smokingTrackerService,
                                      DrinkingTrackerService drinkingTrackerService,
                                      MealPlannerService mealPlannerService,
                                      ScreenTimeTrackerService screenTimeTrackerService,
                                      SleepTrackerService sleepTrackerService,
                                      SocialSphereService socialSphereService,
                                      MindfulMomentService mindfulMomentService,
                                      PasswordEncoder passwordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.hydroTrackService = hydroTrackService;
        this.activeMoveTrackerService = activeMoveTrackerService;
        this.smokingTrackerService = smokingTrackerService;
        this.drinkingTrackerService = drinkingTrackerService;
        this.mealPlannerService = mealPlannerService;
        this.screenTimeTrackerService = screenTimeTrackerService;
        this.sleepTrackerService = sleepTrackerService;
        this.mindfulMomentService = mindfulMomentService;
        this.socialSphereService = socialSphereService;
        this.passwordEncoder = passwordEncoder;
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
        if (applicationUserRepository.findByUsername(username).isPresent()) {
            throw new UsernameAlreadyExistsException();
        }
        String encryptedPassword = passwordEncoder.encode(password);
        ApplicationUser user = new ApplicationUser(username, encryptedPassword, email);

        applicationUserRepository.save(user);

        hydroTrackService.create(null, null, user);
        activeMoveTrackerService.create(null, user);
        smokingTrackerService.create(null, null, user);
        drinkingTrackerService.create(null, null, user);
        mindfulMomentService.create(null, null, null, user);
        mealPlannerService.create(user);
        screenTimeTrackerService.create(null, null, user);
        sleepTrackerService.create(null, null, null, user);
        socialSphereService.create(user);
        return user;
    }

    @Override
    public ApplicationUser edit(Long Id, String username, String password, String email) {
        ApplicationUser user = findById(Id);
        if (!applicationUserRepository.findByUsername(username).isEmpty()) {
            throw new UsernameAlreadyExistsException();
        }
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

    @Override
    public ApplicationUser login(String username, String password) {

        logger.info("Attempting to login user: {}", username);
        Optional<ApplicationUser> optionalUser = applicationUserRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            logger.warn("User not found: {}", username);
            throw new UserDoesNotExistException();
        }

        ApplicationUser user = optionalUser.get();
        if (passwordEncoder.matches(password, user.getPassword())) {
            logger.info("User authenticated successfully: {}", username);
            return user;
        } else {
            logger.warn("Password mismatch for user: {}", username);
            return null;
        }
    }

    @Override
    public ApplicationUser findByUsername(String username) {
        return applicationUserRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        logger.info("Loading user by username: {}", username);
        ApplicationUser user = applicationUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        logger.info("User loaded successfully: {}", username);
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getAuthorities());
    }
}
