package eu.consilium.core.service.general.auth;


import eu.consilium.core.model.dto.auth.AuthResponseDTO;
import eu.consilium.core.model.dto.auth.RegisterRequestDTO;

public interface AuthService {
    AuthResponseDTO register(RegisterRequestDTO request);
    AuthResponseDTO login(String email, String password);
}
