package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocialSphere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<SocialActivity> socialActivitySuggestions;
    @OneToOne
    private ApplicationUser applicationUser;

    public SocialSphere(List<SocialActivity> socialActivitySuggestions, ApplicationUser applicationUser) {
        this.socialActivitySuggestions = socialActivitySuggestions;
        this.applicationUser = applicationUser;
    }
}
