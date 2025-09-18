package com.appointmenthostpital.server.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import com.appointmenthostpital.server.services._UserDetailService;
import com.appointmenthostpital.server.utils.BCryptPassword;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private BCryptPassword bCryptPassword;

    @Autowired
    JwtAuthConverterConfig jwtAuthConverterConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authz -> authz
                        // Not require Jwt token for auth routes
                        .requestMatchers("/auth/**").permitAll()
                        // Require Jwt token for user and other roles
                        .requestMatchers("/api/public/**").authenticated()
                        // Require Jwt token for admin role
                        .requestMatchers("/api/admin/**").hasRole("ADMIN"))
                // Configure JWT authentication
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(this.jwtAuthConverterConfig.jwtAuthenticationConverter())))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .build();
    }

    // AuthenticationProvider to use the custom user details service and password
    // encoder
    @Bean
    public AuthenticationProvider authenticationProvider(_UserDetailService userDetailService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailService);
        provider.setPasswordEncoder(this.bCryptPassword.passwordEncoder());
        return provider;
    }

    // AuthenticationManager bean to manage authentication process
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
