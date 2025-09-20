package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.user.UserDetailDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * Get all detail about user by JWT
     * 
     * @param authentication
     * @return
     */
    @GetMapping("/public/v1/api/v1/me")
    public ResponseEntity<RestResponse<UserDetailDTO>> getDetailUser(Authentication authentication) {
        try {
            UserDetailDTO userDetail = this.userService.getDetailUser(authentication);
            return ResponseEntity.ok().body(
                new RestResponse<UserDetailDTO>(
                    HttpStatusResponse.OK, 
                    true, 
                    userDetail, 
                    HttpStatusResponse.SUCCESS_MESSAGE, 
                    null
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusResponse.INTERNAL_SERVER_ERROR).body(
                new RestResponse<UserDetailDTO>(
                    HttpStatusResponse.INTERNAL_SERVER_ERROR,
                    false,
                    null,
                    "Không thể tải thông tin người dùng",
                    e.getMessage()
                )
            );
        }
    }

    /**
     * Update user profile
     * 
     * @param authentication
     * @param updateRequest
     * @return
     */
    @PutMapping("/user/profile")
    public ResponseEntity<RestResponse<UserUpdateDTO.UpdateProfileResponse>> updateUserProfile(
            Authentication authentication,
            @Valid @RequestBody UserUpdateDTO.UpdateProfileRequest updateRequest) {
        
        try {
            this.userService.validateUpdateRequest(updateRequest);
            
            UserUpdateDTO.UpdateProfileResponse response = this.userService.updateUserProfile(authentication, updateRequest);
            
            return ResponseEntity.ok().body(
                new RestResponse<UserUpdateDTO.UpdateProfileResponse>(
                    HttpStatusResponse.OK,
                    true,
                    response,
                    "Cập nhật thông tin thành công",
                    null
                )
            );
            
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(
                new RestResponse<UserUpdateDTO.UpdateProfileResponse>(
                    HttpStatusResponse.BAD_REQUEST,
                    false,
                    null,
                    "Cập nhật thất bại",
                    e.getMessage()
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusResponse.INTERNAL_SERVER_ERROR).body(
                new RestResponse<UserUpdateDTO.UpdateProfileResponse>(
                    HttpStatusResponse.INTERNAL_SERVER_ERROR,
                    false,
                    null,
                    "Đã xảy ra lỗi hệ thống",
                    e.getMessage()
                )
            );
        }
    }
}
