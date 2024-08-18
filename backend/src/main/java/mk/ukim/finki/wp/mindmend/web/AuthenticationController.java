package mk.ukim.finki.wp.mindmend.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.DTO.ApplicationAuthDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.ApplicationUserDTO;
import mk.ukim.finki.wp.mindmend.model.DTO.responses.AuthResponseDTO;
import mk.ukim.finki.wp.mindmend.service.impl.ApplicationUserServiceImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = {"chrome-extension://ehijlmogfgehaejkfiobfloafoopecgp", "http://localhost:3000"}, allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final ApplicationUserServiceImpl applicationUserService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(ApplicationUserServiceImpl applicationUserService, AuthenticationManager authenticationManager) {
        this.applicationUserService = applicationUserService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public ApplicationUser signup(@RequestBody ApplicationUserDTO applicationUserDTO) {
        return applicationUserService.create(
                applicationUserDTO.getUsername(),
                applicationUserDTO.getPassword(),
                applicationUserDTO.getEmail());

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody ApplicationAuthDTO applicationAuthDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(applicationAuthDTO.getUsername(), applicationAuthDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userForDTO = applicationUserService.loadUserByUsername(applicationAuthDTO.getUsername());
            AuthResponseDTO responseDTO = new AuthResponseDTO(applicationUserService.findByUsername(userForDTO.getUsername()).getId(),
                    userForDTO.getUsername(),
                    userForDTO.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst().orElseThrow(() -> new IllegalStateException("User has no assigned roles")));
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);
         if (session != null)
             session.invalidate();

        return ResponseEntity.ok("User logged out successfully");
    }
}
