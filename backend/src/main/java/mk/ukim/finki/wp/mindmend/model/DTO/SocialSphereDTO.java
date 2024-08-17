package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;

import java.util.List;

@Data
public class SocialSphereDTO {
    private Long userId;
    private List<SocialActivity> socialActivitySuggestions;
}
