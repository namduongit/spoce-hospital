package com.appointmenthostpital.server.services;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.configs.JWTConfig;
import com.appointmenthostpital.server.dtos.JWTResponse;

@Service
public class JWTService {
    @Autowired
    private JWTConfig jwtConfig;

    public JWTResponse generateToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(jwtConfig.getEXPIRATION_TIME());

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(expiry)
                .subject(authentication.getName())
                .claim("role", authorities)
                .build();

        // String token = this.jwtConfig.jwtEncoder().encode(JwtEncoderParameters.from(claims)).getTokenValue();  -- Will error because no alg in header
        String token = this.jwtConfig.jwtEncoder().encode(JwtEncoderParameters.from(JwsHeader.with(this.jwtConfig.getJwtAlgorithm()).build(), claims)).getTokenValue();

        return new JWTResponse(token, (int) now.getEpochSecond(), (int) expiry.getEpochSecond());
    }
}
