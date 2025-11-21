package eu.consilium.core.util.mapper;


import eu.consilium.core.model.dto.UserDTO;
import eu.consilium.core.model.entity.UserEntity;
import eu.consilium.core.model.enums.Role;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(UserEntity entity) {
        return UserDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .role(entity.getRole().name())
                .verified(entity.isVerified())
                .rating(entity.getRating())
                .build();
    }

    public UserEntity toEntity(UserDTO userDTO) {
        return UserEntity.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail())
                .role(Role.valueOf(userDTO.getRole()))
                .verified(userDTO.isVerified())
                .rating(userDTO.getRating())
                .build();
    }
}