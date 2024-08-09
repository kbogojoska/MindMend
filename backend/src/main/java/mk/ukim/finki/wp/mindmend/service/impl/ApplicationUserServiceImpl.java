package mk.ukim.finki.wp.mindmend.service.impl;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.exceptions.UserDoesNotExistException;
import mk.ukim.finki.wp.mindmend.model.exceptions.UserNotFoundException;
import mk.ukim.finki.wp.mindmend.repository.ApplicationUserRepository;
import mk.ukim.finki.wp.mindmend.service.ApplicationUserService;
import mk.ukim.finki.wp.mindmend.model.exceptions.UsernameAlreadyExistsException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationUserServiceImpl implements ApplicationUserService, UserDetailsService {
    private final ApplicationUserRepository applicationUserRepository;
    private final PasswordEncoder passwordEncoder;


    private static final Logger logger = LoggerFactory.getLogger(ApplicationUserServiceImpl.class);

    public ApplicationUserServiceImpl(ApplicationUserRepository applicationUserRepository, PasswordEncoder passwordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
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
        if (!applicationUserRepository.findAllByEmail(email).isEmpty()) {
            throw new UsernameAlreadyExistsException();
        }
        String encryptedPassword = passwordEncoder.encode(password);
        ApplicationUser user = new ApplicationUser(username, encryptedPassword, email);
//        User userForUserRepo = new User(username, encryptedPassword, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
//        userRepository.save(user);
        applicationUserRepository.save(user);
        try {
            return applicationUserRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new UsernameAlreadyExistsException();
        }

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
