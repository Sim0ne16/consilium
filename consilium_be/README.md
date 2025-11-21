# Consilium Backend (core)

A Spring Boot 3 application that powers Consilium — a platform for matching users with consultants, including authentication/authorization, consulting requests, chat messages, wallets and transactions, and Redis-backed caching.

Current date: 2025-11-12

## Overview
- Language: Java 21
- Framework: Spring Boot 3.5.x
- Build tool / Package manager: Maven (wrapper included: `mvnw`, `mvnw.cmd`)
- Key modules/dependencies:
  - Web (`spring-boot-starter-web`)
  - Data JPA (`spring-boot-starter-data-jpa`) with PostgreSQL
  - Security (`spring-boot-starter-security`) with JWT (JJWT)
  - Caching (`spring-boot-starter-cache`) using Redis
  - OpenAPI/Swagger UI (`springdoc-openapi-starter-webmvc-ui`)
  - Actuator (`spring-boot-starter-actuator`)
  - Lombok
- Entry point: `eu.consilium.core.ConsiliumApplication` (Spring Boot)
- OpenAPI UI: `/swagger-ui.html`

## Project Structure
Root contains a single module `core/`.

```
consilium_be/
├─ core/
│  ├─ pom.xml
│  ├─ mvnw, mvnw.cmd
│  ├─ src/
│  │  ├─ main/java/eu/consilium/core/
│  │  │  ├─ ConsiliumApplication.java                 # Spring Boot entrypoint
│  │  │  ├─ config/
│  │  │  │  ├─ other/
│  │  │  │  │  ├─ OpenApiConfig.java                  # Swagger/OpenAPI config
│  │  │  │  │  ├─ RedisCacheConfig.java               # Redis cache settings
│  │  │  │  │  ├─ SwaggerConfig.java                  # (legacy/custom swagger)
│  │  │  │  │  ├─ WebSocketConfig.java                # TODO: to be configured
│  │  │  │  └─ security/
│  │  │  │     ├─ ApplicationConfig.java
│  │  │  │     ├─ JwtFilter.java
│  │  │  │     ├─ JwtProvider.java
│  │  │  │     └─ SecurityConfig.java
│  │  │  ├─ controller/                               # REST controllers (auth, user, admin, chat, wallet, consulting)
│  │  │  ├─ model/ (dto, entity, enums)
│  │  │  ├─ repository/                               # Spring Data JPA repositories
│  │  │  ├─ service/ (general, impl)
│  │  │  └─ util/mapper/                              # DTO <-> Entity mappers
│  │  └─ main/resources/
│  │     ├─ application.properties                    # Env & service config
│  │     └─ INFO.MD
│  │
│  │  └─ test/java/eu/consilium/core/
│  │     └─ ConsiliumApplicationTests.java            # Basic context test
│  └─ target/                                         # Build outputs
└─ README.md (this file)
```

## Requirements
- Java 21 (JDK 21)
- Maven 3.9+ (or use the bundled wrapper `mvnw`/`mvnw.cmd`)
- PostgreSQL (default URL: `jdbc:postgresql://localhost:5433/consilium`)
- Redis (default: `localhost:6379`)

Optional/dev:
- A tool to manage services (e.g., Docker) — not provided in this repo.

## Configuration
Main application properties are in `core/src/main/resources/application.properties`.
Default values (update for your environment or override via env vars/system props):

```
# Server
server.port=8080
spring.application.name=consilium

# Database (PostgreSQL)
spring.datasource.url=jdbc:postgresql://localhost:5433/consilium
spring.datasource.username=postgres
spring.datasource.password=postgres

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.open-in-view=false

# Security (Spring Boot’s basic user - dev only)
spring.security.user.name=admin
spring.security.user.password=admin

# JWT
jwt.secret=...                      # replace in production
jwt.expiration=86400000             # 24h in ms

# Swagger / OpenAPI
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.persist-authorization=true
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true

# Cache / Redis
spring.cache.type=redis
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.data.redis.timeout=6000
spring.data.redis.lettuce.pool.max-active=8
spring.data.redis.lettuce.pool.max-idle=8
spring.data.redis.lettuce.pool.min-idle=0
spring.data.redis.lettuce.pool.time-between-eviction-runs=1s
```

### Environment variables
You can override most properties via environment variables or JVM system properties. Examples:
- `SERVER_PORT`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `SPRING_DATA_REDIS_HOST`
- `SPRING_DATA_REDIS_PORT`

For production, never commit secrets. Provide `JWT_SECRET` securely and change default credentials.

## Setup
1. Ensure PostgreSQL is running and a database named `consilium` exists on port `5433` (or adjust `spring.datasource.url`).
2. Ensure Redis is running on `localhost:6379` (or update Redis properties accordingly).
3. Optionally, create a `.env`/profile-specific properties to avoid editing `application.properties` directly.

## How to Run
From the `core` directory:

- Using Maven Wrapper (Windows):
  - Start app: `mvnw.cmd spring-boot:run`
  - Build jar: `mvnw.cmd clean package`
  - Run tests: `mvnw.cmd test`

- Using Maven Wrapper (Unix/macOS):
  - Start app: `./mvnw spring-boot:run`
  - Build jar: `./mvnw clean package`
  - Run tests: `./mvnw test`

After starting, visit:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Actuator: `http://localhost:8080/actuator` (endpoints depend on config)

## Scripts / Common Commands
- `mvnw[.cmd] spring-boot:run` — run the application
- `mvnw[.cmd] test` — run tests
- `mvnw[.cmd] clean package` — build an executable jar at `core/target/core-0.0.1-SNAPSHOT.jar`

## Features (high-level)
- Authentication and Authorization with JWT
  - `JwtProvider`, `JwtFilter`, and `SecurityConfig`
  - `AuthController`, `AuthService`
- User, Admin, Wallet, Consulting, Chat controllers
- Entities/DTOs for users, chat messages, consulting requests, wallets, and transactions
- Redis-backed caching (`@EnableCaching`) with JSON serialization
- OpenAPI/Swagger for API exploration

## Testing
- Unit/integration tests executed via Maven: `mvnw test`
- Existing test: `ConsiliumApplicationTests` validates Spring context load.
- TODO: Add tests for security, services, repositories, and controllers.

## Development Notes
- Lombok is used for boilerplate reduction. Ensure your IDE has Lombok plugin enabled and annotation processing turned on.
- The `WebSocketConfig` exists but is not configured. Messaging features are TODO.
- `application.properties` contains development defaults. For production, externalize configuration and secrets.

## Profiles
- No explicit Spring profiles are defined in this repository. You can create `application-dev.properties`, `application-prod.properties`, etc., as needed. Update the run command with `-Dspring-boot.run.profiles=dev` or use `SPRING_PROFILES_ACTIVE`.

## API Documentation
- OpenAPI UI at `/swagger-ui.html`.
- Controllers are under `eu.consilium.core.controller.*`.
- Security: JWT required for protected endpoints. Obtain token via auth endpoints (see `AuthController`).

## Database Migrations
- Not configured. TODO: Add Flyway or Liquibase for schema versioning.

## Docker / Containerization
- Not provided. TODO: Add Dockerfile and docker-compose for app, PostgreSQL, and Redis.

## CI/CD
- Not configured. TODO: Add GitHub Actions/GitLab CI to run build and tests.

## License
No license file is present in this repository.

- TODO: Choose and add a license (e.g., MIT, Apache-2.0) and update `pom.xml` license metadata.

---

## Troubleshooting
- Port conflicts: change `server.port`.
- DB connection errors: verify `spring.datasource.*` match your PostgreSQL instance and DB exists.
- Redis errors: ensure Redis is reachable at configured host/port.
- JWT issues: set a strong `JWT_SECRET` and align expiration values across services.

## Maintainers
- TODO: Add maintainers and contact info.
