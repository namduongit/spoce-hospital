package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.user.UserDetailDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.repositories.UserRepository;
import com.appointmenthostpital.server.repositories.UserProfileRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserProfileRepository userProfileRepository;

    /**
     * Get user by email
     * @param username
     * @return
     */
    public UserModel getUserByEmail(String username) {
        return this.userRepository.findByEmail(username);
    }

    /**
     * Get all users
     * @return
     */
    public List<UserModel> getUserList() {
        return this.userRepository.findAll();
    }

    /**
     * Get user detail by authentication
     * @param authentication
     * @return
     */
    public UserDetailDTO getDetailUser(Authentication authentication) {
        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);
        return new UserDetailDTO(userModel.getId(), userModel.getEmail(), userModel.getRole(), userModel.getType(),
                userModel.getStatus(), userModel.getUserProfileModel(), userModel.getUserAppointmets());
    }

    /**
     * Update user profile
     * @param authentication
     * @param updateRequest
     * @return
     */
    public UserUpdateDTO.UpdateProfileResponse updateUserProfile(Authentication authentication, 
            UserUpdateDTO.UpdateProfileRequest updateRequest) {
        
        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);
        
        if (userModel == null) {
            throw new RuntimeException("Không tìm thấy thông tin người dùng");
        }
        
        UserProfileModel userProfile = userModel.getUserProfileModel();
        if (userProfile == null) {
            userProfile = new UserProfileModel();
            userProfile.setUserModel(userModel);
            userModel.setUserProfileModel(userProfile);
        }
        
        userProfile.setFullName(updateRequest.getFullName());
        userProfile.setPhone(updateRequest.getPhone());
        userProfile.setAddress(updateRequest.getAddress());
        userProfile.setBirthDate(updateRequest.getBirthDate());
        
        UserProfileModel savedProfile = this.userProfileRepository.save(userProfile);
        
        return new UserUpdateDTO.UpdateProfileResponse(
            savedProfile.getId(),
            savedProfile.getFullName(),
            savedProfile.getPhone(),
            savedProfile.getAddress(),
            savedProfile.getBirthDate(),
            "Cập nhật thông tin thành công"
        );
    }

    /**
     * Validate user profile update request
     * @param updateRequest
     * @throws RuntimeException if validation fails
     */
    public void validateUpdateRequest(UserUpdateDTO.UpdateProfileRequest updateRequest) {
        if (updateRequest.getFullName() == null || updateRequest.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Họ và tên không được để trống");
        }
        
        if (updateRequest.getPhone() == null || updateRequest.getPhone().trim().isEmpty()) {
            throw new RuntimeException("Số điện thoại không được để trống");
        }
        
        String phone = updateRequest.getPhone().replaceAll("\\s", "");
        if (!phone.matches("^[0-9]{10,11}$")) {
            throw new RuntimeException("Số điện thoại không hợp lệ");
        }
        
        if (updateRequest.getBirthDate() == null || updateRequest.getBirthDate().trim().isEmpty()) {
            throw new RuntimeException("Ngày sinh không được để trống");
        }
        
        if (!updateRequest.getBirthDate().matches("^\\d{4}-\\d{2}-\\d{2}$")) {
            throw new RuntimeException("Ngày sinh phải có định dạng yyyy-MM-dd");
        }
    }
}
