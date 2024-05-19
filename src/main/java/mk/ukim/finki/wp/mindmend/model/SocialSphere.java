package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
