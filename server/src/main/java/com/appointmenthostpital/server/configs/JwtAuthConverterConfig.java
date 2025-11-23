package com.appointmenthostpital.server.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

@Configuration
public class JwtAuthConverterConfig {

    /**
     * Configures JWT authentication converter to extract roles from the "role" claim
     * and prefix them with "ROLE_".
     * Example: A JWT with "role": "ADMIN" will be converted to authority "ROLE_ADMIN".
     * UserDetailService implements UserDetailsService to load user details during authentication.
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("role");      // Get role from "role" claim
        converter.setAuthorityPrefix("ROLE_");               // Add prefix "ROLE_" to role name. Auto prefix is "SCOPE_"

        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}
