package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocialActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String description;
// if we are doing different activities for different user-social-spheres the we need this
// + mappedBy = "socialSphere",  in the one-to-many relation in social sphere
//    @ManyToOne
//    @JoinColumn(name = "social_sphere_id")
//    private SocialSphere socialSphere;

    public SocialActivity(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
