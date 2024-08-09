package mk.ukim.finki.wp.mindmend.model.DTO;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String username;
    private String role;

    public AuthResponseDTO(String username, String role) {
        this.username = username;
        this.role = role;
    }
}