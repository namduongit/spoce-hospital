package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.auth.LoginDTO;
import com.appointmenthostpital.server.dtos.auth.RegisterDTO;
import com.appointmenthostpital.server.dtos.auth.AuthConfig;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.services.AuthService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    /**
     * Register a new user
     * 
     * @param registerRequest
     * @return
     * @throws PasswordNotValidException
     */
    @PostMapping("/register")
    public ResponseEntity<RestResponse<RegisterDTO.RegisterResponse>> handleRegister(
            @Valid @RequestBody RegisterDTO.RegisterRequest request) throws PasswordNotValidException {
        RegisterDTO.RegisterResponse registerResponse = this.authService.handleRegister(request);

        RestResponse<RegisterDTO.RegisterResponse> response = new RestResponse<RegisterDTO.RegisterResponse>(
                HttpStatusResponse.CREATED,
                true,
                registerResponse,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null);

        return ResponseEntity.status(HttpStatusResponse.CREATED).body(response);
    }

    /**
     * Login request
     * 
     * @param loginRequest
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<RestResponse<LoginDTO.LoginResponse>> handleLogin(
            @Valid @RequestBody LoginDTO.LoginRequest request) {
        LoginDTO.LoginResponse loginResponse = this.authService.handleLogin(request);

        RestResponse<LoginDTO.LoginResponse> response = new RestResponse<LoginDTO.LoginResponse>(
                HttpStatusResponse.OK,
                true,
                loginResponse,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }

    /**
     * Valid token request
     * 
     * @param authentication
     * @return
     */
    @PostMapping("/authConfig")
    public ResponseEntity<RestResponse<AuthConfig>> handleValid(Authentication authentication) {
        AuthConfig authConfig = this.authService.handleValid(authentication);

        RestResponse<AuthConfig> response = new RestResponse<AuthConfig>(
                HttpStatusResponse.OK,
                true,
                authConfig,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }
}
