package eu.consilium.core.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    /*
    Filtro eseguito per ogni richiesta non esclusa.

    Compiti:
        Intercetta ogni richiesta.
        Salta gli endpoint pubblici usando shouldNotFilter.
        Legge l’header Authorization, estrae il token.
        Usa JwtAuthProvider per ricavare l’username e verificare il token.
        Carica l’utente da UserDetailsService.
        Se valido, crea l’Authentication e la inserisce nel SecurityContext, autorizzando la richiesta.

    Connessioni:
        dipende da JwtAuthProvider per la validazione e da UserDetailsService per il caricamento dell’utente.
        È il nodo operativo che applica la logica JWT alla singola request.
     */

    private final JwtAuthProvider jwtAuthProvider;
    private final UserDetailsService userDetailsService;

    private static final AntPathMatcher matcher = new AntPathMatcher();
    private static final String[] PUBLIC = {
            "/api/auth/**",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/webjars/**"
    };

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        for (String pattern : PUBLIC) {
            if (matcher.match(pattern, path)) return true;
        }
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws IOException, ServletException {

        String authHeader = request.getHeader("Authorization");

        // se manca l'header → blocca
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing or invalid Authorization header");
            return;
        }

        String token = authHeader.substring(7);
        String username = jwtAuthProvider.extractUsername(token);

        // se token invalido → blocca prima del controller
        if (username == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
            return;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtAuthProvider.isTokenValid(token, userDetails)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token expired or invalid");
            return;
        }

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        chain.doFilter(request, response);
    }
}