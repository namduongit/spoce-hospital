package com.appointmenthostpital.server.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import com.appointmenthostpital.server.services.UserDetailService;
import com.appointmenthostpital.server.utils.BCryptPassword;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private BCryptPassword bCryptPassword;

    @Autowired
    private AuthEntryPointConfig authEntryPointConfig;

    @Autowired
    private AccessDeniedConfig accessDeniedConfig;

    /**
     * @Note
     * - After send request, OPTIONS request (preflight) will ask BE: Can i do
     * this ? (None AccessToken)
     * - OPTION success -> then next
     * 
     * @param http
     * @param jwtAuthConverter
     * @return
     * @throws Exception
     */

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthConverterConfig config) throws Exception {
        http.csrf(csrf -> csrf.disable()); // Disable CSRF protection for stateless APIs to use Postman
        http.cors(cors -> {});
        http.authorizeHttpRequests(authz -> authz
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers("/auth/*").permitAll()
            .requestMatchers("/api/public/**").authenticated()

            .requestMatchers("/api/accounts/**").hasAnyRole("ADMIN", "DOCTOR", "ASSISTOR", "USER")

            .requestMatchers("/api/departments/**").hasAnyRole("ADMIN", "DOCTOR", "ASSISTOR", "USER")
            .requestMatchers("/api/doctors/**").hasAnyRole("ADMIN", "DOCTOR", "ASSISTOR", "USER")
            .requestMatchers("/api/rooms/**").hasAnyRole("ADMIN", "DOCTOR", "ASSISTOR", "USER")

            .requestMatchers("/api/appointments/**").hasAnyRole("ADMIN", "DOCTOR", "ASSISTOR", "USER")
            .anyRequest().authenticated()
        );
        http.oauth2ResourceServer(oauth2r -> oauth2r
            .jwt(jwt -> jwt
                .jwtAuthenticationConverter(config.jwtAuthenticationConverter())
            )
        );
        http.exceptionHandling(exception -> exception
            .accessDeniedHandler(this.accessDeniedConfig)
            .authenticationEntryPoint(this.authEntryPointConfig)
        );
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Config basic auth. Use username and password any request
        // http.httpBasic(basic -> {});
        return http.build();
    }

    // AuthenticationProvider to use the custom user details service and password encoder
    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailService userDetailService) {
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
