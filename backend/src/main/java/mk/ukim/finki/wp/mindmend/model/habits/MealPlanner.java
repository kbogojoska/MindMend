package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.Recipe;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealPlanner{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Recipe> recipes;

    @OneToOne
    private ApplicationUser user;

    public MealPlanner(ApplicationUser user, List<Recipe> recipes) {
        this.user = user;
        this.recipes = recipes;
    }

    public Recipe getPickOfTheDay(Long userId) {
        LocalDate today = LocalDate.now();
        long seed = today.getYear() * 10000L + today.getMonthValue() * 100L + today.getDayOfMonth() + userId*10;
        Random random = new Random(seed);
        return recipes.get(random.nextInt(recipes.size()));
    }
}