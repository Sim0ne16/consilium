package eu.consilium.core.service.impl.auth;

import eu.consilium.core.model.dto.UserDTO;
import eu.consilium.core.model.entity.UserEntity;
import eu.consilium.core.repository.UserRepository;
import eu.consilium.core.service.general.other.UserService;
import eu.consilium.core.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Cacheable(value = "users", key = "'email:' + #email", unless = "#result == null")
    public Optional<UserDTO> getUserByEmail(String email) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(email);
        return userEntity.map(userMapper::toDTO);
    }

    @CacheEvict(value = "users", key = "#email")
    public void invalidateUserCache(String email) {
    }
}