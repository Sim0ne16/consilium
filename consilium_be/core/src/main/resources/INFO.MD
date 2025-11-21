### Security

| Componente | Scopo | Usato da |
|-------------|--------|-----------|
| **ApplicationConfig** | Definisce i bean di sicurezza condivisi (`UserDetailsService`, `PasswordEncoder`, `AuthenticationProvider`) | Tutta l’applicazione |
| **SecurityConfig** | Gestisce la configurazione HTTP: CORS, CSRF, filtri JWT, regole di accesso | Spring Security |
| **JwtProvider** | Genera e valida i token JWT (firma, scadenza, parsing) | `AuthService`, `JwtAuthFilter` |
| **JwtAuthFilter** | Intercetta le richieste HTTP, valida il token e popola il contesto di sicurezza | Catena di filtri HTTP |
| **AuthService** | Gestisce login, registrazione e creazione token JWT | Controller `/api/auth/**` |


Cache tramite Redis