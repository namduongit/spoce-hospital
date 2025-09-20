package com.appointmenthostpital.server.configs;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import com.nimbusds.jose.jwk.source.ImmutableSecret;

@Configuration
public class JWTConfig {
    @Value("${SECRET_KEY}")
    private String SECRET_KEY;

    @Value("${EXPIRATION_TIME}")
    private Long EXPIRATION_TIME;

    private MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    public Long getEXPIRATION_TIME() {
        return EXPIRATION_TIME;
    }

    public MacAlgorithm getJwtAlgorithm() {
        return JWT_ALGORITHM;
    }

    public SecretKeySpec getSecretKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(decodedKey, JWT_ALGORITHM.getName());
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(this.getSecretKey()).macAlgorithm(this.JWT_ALGORITHM).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));
    }
}
