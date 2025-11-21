package eu.consilium.core.service.general.other;

import eu.consilium.core.model.dto.UserDTO;

import java.util.Optional;


public interface UserService {

    Optional<UserDTO> getUserByEmail(String email);

    void invalidateUserCache(String email);

}
