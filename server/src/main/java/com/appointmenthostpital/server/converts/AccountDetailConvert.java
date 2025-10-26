package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.responses.AccountDetail;

public class AccountDetailConvert {
    public static AccountDetail.ProfileDetailResponse convertToProfileDetailResponse(AccountModel model) {
        return new AccountDetail.ProfileDetailResponse(
            model.getEmail(), model.getRole(), model.getType(), model.getStatus(),
            model.getUserProfileModel().getFullName(), model.getUserProfileModel().getPhone(),
            model.getUserProfileModel().getAddress(), model.getUserProfileModel().getBirthDate()
        );
    }

    public static AccountDetail.DoctorDetailResponse convertToDoctorDetailResponse(AccountModel model) {
        return new AccountDetail.DoctorDetailResponse(
            model.getEmail(), model.getRole(), model.getType(), model.getStatus(),
            model.getDoctorProfileModel().getImage(), model.getDoctorProfileModel().getFullName(),
            model.getDoctorProfileModel().getGender(), model.getDoctorProfileModel().getPhone(),
            model.getDoctorProfileModel().getBirthDate(), model.getDoctorProfileModel().getDegree(),
            model.getDoctorProfileModel().getWorkDay(), model.getDoctorProfileModel().getStatus()
        );
    }

    public static void convertFromUpdateUserProfileRequest(AccountModel model, UserUpdateDTO.UpdateProfileRequest request) {
        model.getUserProfileModel().setFullName(request.getFullName());
        model.getUserProfileModel().setPhone(request.getPhone());
        model.getUserProfileModel().setAddress(request.getAddress());
        model.getUserProfileModel().setBirthDate(request.getBirthDate());
    }
}
