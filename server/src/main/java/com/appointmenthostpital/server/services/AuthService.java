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
import com.appointmenthostpital.server.dtos.auth.ValidResponse;
import com.appointmenthostpital.server.exceptions.AccountLockedException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.repositories.UserRepository;
import com.appointmenthostpital.server.utils.BCryptPassword;

import com.appointmenthostpital.server.utils.DateCustom;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPassword bCryptPassword;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    /**
     * 
     * @param registerRequest
     * @return
     */
    public RegisterDTO.RegisterResponse handleRegister(RegisterDTO.RegisterRequest registerRequest) {
        UserModel userModel = new UserModel();
        UserProfileModel profileModel = new UserProfileModel();

        userModel.setEmail(registerRequest.getEmail());
        userModel.setPassword(this.bCryptPassword.passwordEncoder().encode(registerRequest.getPassword()));
        userModel.setRole("USER");
        userModel.setStatus("ACTIVE");
        userModel.setUserProfileModel(profileModel);

        profileModel.setUserModel(userModel);

        UserModel model = this.userRepository.save(userModel);

        return new RegisterDTO.RegisterResponse(model.getId(), model.getEmail(), model.getRole(), model.getType(),
                DateCustom.getCurrentTimeStamp());
    }

    /**
     * 
     * @param loginRequest
     * @return
     */
    public LoginDTO.LoginResponse handleLogin(LoginDTO.LoginRequest request) {
        UserModel userModel = this.userRepository.findByEmail(request.getEmail());
        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        if (!bCryptPassword.passwordEncoder().matches(request.getPassword(), userModel.getPassword())) {
            throw new PasswordNotValidException("Mật khẩu không đúng");
        }
        if (userModel.getStatus().equals("INACTIVE")) {
            throw new AccountLockedException("Tài khoản đã bị khóa");
        }

        Authentication authentication = this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        JWTResponse jwtResponse = this.jwtService.generateToken(authentication);

        return new LoginDTO.LoginResponse(jwtResponse.getAccessToken(), request.getEmail(), jwtResponse.getRole(), jwtResponse.getNow(), jwtResponse.getValidity());
    }

    /**
     * 
     * @param authentication
     * @return
     */
    @SuppressWarnings("null")
    public ValidResponse handleValid(Authentication authentication) {
        String email = authentication.getName();
        UserModel userModel = this.userRepository.findByEmail(email);
        Jwt jwt = (Jwt)authentication.getPrincipal();
        
        return new ValidResponse(email, userModel.getRole(), (int)jwt.getIssuedAt().getEpochSecond(), (int)jwt.getExpiresAt().getEpochSecond());
    }

}
