package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

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
    @JoinColumn(name = "application_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ApplicationUser applicationUser;

    public SocialSphere(List<SocialActivity> socialActivitySuggestions, ApplicationUser applicationUser) {
        this.socialActivitySuggestions = socialActivitySuggestions;
        this.applicationUser = applicationUser;
    }

    public SocialActivity getPickOfTheDay(Long userId) {
        LocalDate today = LocalDate.now();
        long seed = today.getYear() * 10000L + today.getMonthValue() * 100L + today.getDayOfMonth() + userId*10;
        Random random = new Random(seed);
        return socialActivitySuggestions.get(random.nextInt(socialActivitySuggestions.size()));
    }
}
