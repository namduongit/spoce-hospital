package com.appointmenthostpital.server.converts;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminAccountDTO;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.responses.AccountResponse;

@Service
public class AccountConvert {
    public static AccountResponse convertToResponse(AccountModel model) {
        return new AccountResponse(
                model.getId(),
                model.getEmail(),
                model.getRole(),
                model.getType(),
                model.getStatus());
    }

    public static void convertFromCreateRequest(AccountModel model, AdminAccountDTO.CreateAccountRequest request) {
        model.setEmail(request.getEmail());
        model.setRole(request.getRole());

        if (request.getRole().equals("DOCTOR")) {
            DoctorProfileModel profile = new DoctorProfileModel();
            model.setDoctorProfileModel(profile);
            profile.setAccountModel(model);
        } else {
            UserProfileModel profile = new UserProfileModel();
            model.setUserProfileModel(profile);
            profile.setAccountModel(model);
        }
    }

    public static void convertFromUpdateRequest(AccountModel model, AdminAccountDTO.UpdateAccountRequest request) {
        if (request.getRole().equals("DOCTOR")) {
            if (model.getDoctorProfileModel() == null) {
                DoctorProfileModel profile = new DoctorProfileModel();
                model.setDoctorProfileModel(profile);
                profile.setAccountModel(model);
            }
            model.setUserProfileModel(null);
        } else {
            if (model.getUserProfileModel() == null) {
                UserProfileModel profile = new UserProfileModel();
                model.setUserProfileModel(profile);
                profile.setAccountModel(model);
            }
            model.setDoctorProfileModel(null);
        }
        model.setStatus(request.getStatus());
    }
}
