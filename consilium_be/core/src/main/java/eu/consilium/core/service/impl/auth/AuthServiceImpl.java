package eu.consilium.core.service.impl.auth;

import eu.consilium.core.config.security.JwtAuthProvider;
import eu.consilium.core.model.dto.auth.AuthResponseDTO;
import eu.consilium.core.model.dto.auth.RegisterRequestDTO;
import eu.consilium.core.model.entity.UserEntity;
import eu.consilium.core.model.enums.Role;
import eu.consilium.core.repository.UserRepository;
import eu.consilium.core.service.general.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final AuthenticationManager authenticationManager;
    private final JwtAuthProvider jwtAuthProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponseDTO login(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        String token = jwtAuthProvider.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                )
        );

        return new AuthResponseDTO(
                token,
                user.getId()
        );


    }

    public AuthResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email already registered");
        }

        UserEntity newUser = UserEntity.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .jobs(request.getJobs())
                .verified(false)
                .rating(0.0)
                .build();

        userRepository.save(newUser);

        String token = jwtAuthProvider.generateToken(
                new org.springframework.security.core.userdetails.User(
                        newUser.getEmail(),
                        newUser.getPassword(),
                        List.of(new SimpleGrantedAuthority("ROLE_" + newUser.getRole().name()))
                )
        );

        return new AuthResponseDTO(
                token,
                newUser.getId()
        );

    }
}


