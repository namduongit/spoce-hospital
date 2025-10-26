package com.appointmenthostpital.server.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.configs.JWTConfig;
import com.appointmenthostpital.server.dtos.auth.JWTResponse;

@Service
public class JWTService {
    @Autowired
    private JWTConfig jwtConfig;

    public JWTResponse generateToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(jwtConfig.getEXPIRATION_TIME());

        // Get first role
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(expiry)
                .subject(authentication.getName())
                .claim("role", role) 
                .build();

        String token = this.jwtConfig.jwtEncoder().encode(JwtEncoderParameters.from(JwsHeader.with(this.jwtConfig.getJwtAlgorithm()).build(), claims)).getTokenValue();

        return new JWTResponse(token, role, (int) now.getEpochSecond(), (int) expiry.getEpochSecond());
    }
}
