package com.appointmenthostpital.server.controllers;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.LoginDTO;
import com.appointmenthostpital.server.dtos.RegisterDTO;
import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.ValidResponse;
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
    public ResponseEntity<RestResponse<RegisterDTO.RegisterResponse>> handlerRegister(
            @Valid @RequestBody RegisterDTO.RegisterRequest registerRequest) throws PasswordNotValidException {
        if (!registerRequest.getPassword().equals(registerRequest.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu và mật khẩu xác nhận phải giống nhau");
        }

        RegisterDTO.RegisterResponse registerResponse = this.authService.handlerRegister(registerRequest);

        RestResponse<RegisterDTO.RegisterResponse> response = new RestResponse<RegisterDTO.RegisterResponse>(
                HttpStatusResponse.CREATED,
                true,
                registerResponse,
                "Tạo tài khoản thành công",
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
    public ResponseEntity<RestResponse<LoginDTO.LoginResponse>> handlerLogin(
            @Valid @RequestBody LoginDTO.LoginRequest loginRequest) {
        LoginDTO.LoginResponse loginResponse = this.authService.handlerLogin(loginRequest);

        RestResponse<LoginDTO.LoginResponse> response = new RestResponse<LoginDTO.LoginResponse>(
                HttpStatusResponse.OK,
                true,
                loginResponse,
                "Đăng nhập thành công",
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
    public ResponseEntity<RestResponse<ValidResponse>> handlerValid(Authentication authentication) {
        // If token is invalid/expired, Spring will reject after return
        ValidResponse validResponse = this.authService.handlerValid(authentication);

        RestResponse<ValidResponse> response = new RestResponse<ValidResponse>(
                HttpStatusResponse.OK,
                true,
                validResponse,
                "Valid token",
                null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }
}
