package com.appointmenthostpital.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.auth.JWTResponse;
import com.appointmenthostpital.server.dtos.auth.LoginDTO;
import com.appointmenthostpital.server.dtos.auth.RegisterDTO;
import com.appointmenthostpital.server.dtos.auth.AuthConfig;
import com.appointmenthostpital.server.exceptions.AccountLockedException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.utils.BCryptPassword;

import com.appointmenthostpital.server.utils.DateCustom;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPassword bCryptPassword;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    public RegisterDTO.RegisterResponse handleRegister(RegisterDTO.RegisterRequest registerRequest) {
        AccountModel accountModel = new AccountModel();
        UserProfileModel profileModel = new UserProfileModel();

        accountModel.setEmail(registerRequest.getEmail());
        accountModel.setPassword(this.bCryptPassword.passwordEncoder().encode(registerRequest.getPassword()));
        accountModel.setRole("USER");
        accountModel.setStatus("ACTIVE");
        accountModel.setUserProfileModel(profileModel);

        profileModel.setAccountModel(accountModel);

        AccountModel model = this.userService.handleRegister(accountModel);

        return new RegisterDTO.RegisterResponse(model.getId(), model.getEmail(), model.getRole(), model.getType(),
                DateCustom.getCurrentTimeStamp());
    }

    public LoginDTO.LoginResponse handleLogin(LoginDTO.LoginRequest request) {
        AccountModel accountModel = this.userService.handleLogin(request.getEmail());
        if (!bCryptPassword.passwordEncoder().matches(request.getPassword(), accountModel.getPassword())) {
            throw new PasswordNotValidException("Mật khẩu không đúng");
        }
        if (accountModel.getStatus().equals("INACTIVE")) {
            throw new AccountLockedException("Tài khoản đã bị khóa");
        }

        Authentication authentication = this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        JWTResponse jwtResponse = this.jwtService.generateToken(authentication);

        return new LoginDTO.LoginResponse(jwtResponse.getAccessToken(), request.getEmail(), jwtResponse.getRole(), jwtResponse.getNow(), jwtResponse.getValidity());
    }

    @SuppressWarnings("null")
    public AuthConfig handleValid(Authentication authentication) {
        String email = authentication.getName();
        AccountModel accountModel = this.userService.getUserByEmail(email);
        Jwt jwt = (Jwt)authentication.getPrincipal();

        return new AuthConfig(email, accountModel.getRole(), (int)jwt.getIssuedAt().getEpochSecond(), (int)jwt.getExpiresAt().getEpochSecond());
    }

}
