package com.appointmenthostpital.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.JWTResponse;
import com.appointmenthostpital.server.dtos.LoginDTO;
import com.appointmenthostpital.server.dtos.RegisterDTO;
import com.appointmenthostpital.server.dtos.ValidResponse;
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
    public RegisterDTO.RegisterResponse handlerRegister(RegisterDTO.RegisterRequest registerRequest) {
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
    public LoginDTO.LoginResponse handlerLogin(LoginDTO.LoginRequest loginRequest) {
        Authentication authentication = this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        JWTResponse jwtResponse = this.jwtService.generateToken(authentication);

        return new LoginDTO.LoginResponse(jwtResponse.getAccessToken(), loginRequest.getEmail(), jwtResponse.getRole(), jwtResponse.getNow(), jwtResponse.getValidity());
    }

    /**
     * 
     * @param authentication
     * @return
     */
    public ValidResponse handlerValid(Authentication authentication) {
        String email = authentication.getName();
        UserModel userModel = this.userRepository.findByEmail(email);
        Jwt jwt = (Jwt)authentication.getPrincipal();
        
        return new ValidResponse(email, userModel.getRole(), (int)jwt.getIssuedAt().getEpochSecond(), (int)jwt.getExpiresAt().getEpochSecond());
    }

}
