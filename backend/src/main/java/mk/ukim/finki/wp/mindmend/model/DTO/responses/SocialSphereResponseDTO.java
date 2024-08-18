package mk.ukim.finki.wp.mindmend.model.DTO.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import mk.ukim.finki.wp.mindmend.model.SocialActivity;

@Data
@AllArgsConstructor
public class SocialSphereResponseDTO {
    private Long id;
    private String username;
    private SocialActivity activityOfTheDay;
}
