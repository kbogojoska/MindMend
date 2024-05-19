package mk.ukim.finki.wp.mindmend.model.habits;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.Recipe;

import java.util.List;

@Entity
@Data
public class MealPlanner{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Recipe> recipes;

    @OneToOne
    private ApplicationUser user;

    public MealPlanner(ApplicationUser user,List<Recipe> recipes) {
        this.user = user;
        this.recipes = recipes;
    }

    public MealPlanner() {

    }
}
