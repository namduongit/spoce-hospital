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
        AccountDetail.DoctorDetailResponse response = new AccountDetail.DoctorDetailResponse();
        response.setEmail(model.getEmail());
        response.setRole(model.getRole());
        response.setType(model.getType());
        response.setStatus(model.getStatus());
        AccountDetail.DoctorDetail profile = new AccountDetail.DoctorDetail();
        if (model.getDoctorProfileModel() == null) throw new NullPointerException("Tài khoản không phải bác sĩ");
        profile.setFullName(model.getDoctorProfileModel().getFullName());
        profile.setPhone(model.getDoctorProfileModel().getPhone());
        profile.setBirthDate(model.getDoctorProfileModel().getBirthDate());
        profile.setImage(model.getDoctorProfileModel().getImage());
        profile.setGender(model.getDoctorProfileModel().getGender());
        profile.setDegree(model.getDoctorProfileModel().getDegree());
        profile.setWorkDay(model.getDoctorProfileModel().getWorkDay());
        profile.setStatus(model.getDoctorProfileModel().getStatus());
        profile.setDepartmentId(model.getDoctorProfileModel().getDepartmentModel().getId());
        profile.setDepartmentName(model.getDoctorProfileModel().getDepartmentModel().getName());
        response.setProfile(profile);

        return response;
    }

    public static void convertFromUpdateUserProfileRequest(AccountModel model, UserUpdateDTO.UpdateProfileRequest request) {
        model.getUserProfileModel().setFullName(request.getFullName());
        model.getUserProfileModel().setPhone(request.getPhone());
        model.getUserProfileModel().setAddress(request.getAddress());
        model.getUserProfileModel().setBirthDate(request.getBirthDate());
    }
}
