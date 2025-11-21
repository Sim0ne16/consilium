package eu.consilium.core.model.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {

    private String name;
    private String surname;
    private String role;
    private List<String> jobs;
    private String email;
    private String password;

}
