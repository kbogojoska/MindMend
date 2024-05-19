package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
        super();
        this.recipes = recipes;
    }

    public MealPlanner() {

    }
}
