*Note*: Note my lecture i read in Spring Secutiry document.

### Store UserDetailsService - Create testing account
```java
@Bean
public UserDetailsService userDetailsService() {
    UserDetails userAccount = User.withUsername("namduongit1")
            // .password(this.bCryptPassword.passwordEncoder().encode("NDuong205")) - -> You don't need to config check Username and password when login
            .password("NDuong205")
            .roles("USER")
            .build();

    UserDetails adminAccount = User.withUsername("namduongit2")
            // .password(this.bCryptPassword.passwordEncoder().encode("NDuong205")) -> You don't need to config check Username and password when login
            .password("NDuong205")
            .roles("ADMIN")
            .build();

    return new InMemoryUserDetailsManager(userAccount, adminAccount);
}
```
- Spring Security calls your `UserDetailsService` to load a user by username. If you typed "namduongit1", it will return that UserDetails object.
- `Spring compares` the password you typed with the one stored here. Since you wrote .password("NDuong205"), it expects exact string match unless you attach a `PasswordEncoder`.
- If the password matches, `authentication succeeds`.
- Spring attaches the roles:
    + "USER" → available as "ROLE_USER"
    + "ADMIN" → available as "ROLE_ADMIN"

---
### How to check Username and Password when Login
```java
@Bean
public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
    provider.setUserDetailsService(userDetailsService());
    return provider;
}
```

- `Is basically` telling Spring “how to check username + password when someone tries to log in.
- `So this code is saying`:
    + “When a login attempt happens, load the user from userDetailsService().”
    → In your case, that’s your `in-memory` users (namduongit1, namduongit2).

    + “Compare the given password using `NoOpPasswordEncoder`.”
    → Which means: don’t `hash`, just compare plain strings. ("NDuong205" == "NDuong205").

---
### Using `.roles()` or `.authorities()` ?
*** 1. Using .roles() ***
```java
UserDetails admin = User.withUsername("admin")
    .password("{noop}123")
    .roles("ADMIN")                                              // Spring adds prefix automatically
    .build();

// When running
.requestMatchers("/api/**").hasRole("ADMIN")                    // OK
.requestMatchers("/api/**").hasAuthority("ROLE_ADMIN")          // Also works
```

*** 2. Using .authorities() ***
```java
UserDetails admin = User.withUsername("admin")
    .password("{noop}123")
    .authorities("ADMIN")                                       // Exact value, no prefix
    .build();

// When running
.requestMatchers("/api/**").hasAuthority("ADMIN")               // OK
.requestMatchers("/api/**").hasRole("ADMIN")                    // FAIL (it looks for ROLE_ADMIN)

```

---
### Loading Accounts from Database
```java
@Service
public class _UserDetailService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = this.userService.getUserByEmail(username);
        if (userModel == null) throw new UsernameNotFoundException("Không tìm thấy tài khoản");
        return User
        .withUsername(userModel.getEmail())
        .password(userModel.getPassword())
        .roles(userModel.getRole()).build();
    }
    
}
```

---
### Security Configuration with JWT
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private BCryptPassword bCryptPassword;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(
                jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
            ));

        http.authenticationProvider(this.authenticationProvider(new _UserDetailService()));
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(_UserDetailService userDetailService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailService);
        provider.setPasswordEncoder(this.bCryptPassword.passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("scope"); // use the "scope" claim from JWT
        converter.setAuthorityPrefix("");           // remove default "SCOPE_" prefix

        JwtAuthenticationConverter jwtAuthConverter = new JwtAuthenticationConverter();
        jwtAuthConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtAuthConverter;
    }
}
```

---
### JWT Flow Summary
- `Login` → `authenticate` with username & password.
- `JWTService` generates a token with subject (username/email) and roles in the `"scope"` claim.
- Client sends the `JWT` as `Authorization`: Bearer <token>.
- Resource Server (Spring Security) decodes token, extracts `authorities` from `"scope"`.
- `Endpoints` are protected with `.hasRole("ADMIN")` or `.hasAuthority("ROLE_ADMIN")`.