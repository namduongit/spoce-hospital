package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.responses.DoctorResponse;

public class DoctorConvert {
    public static DoctorResponse convertToResponse(DoctorProfileModel model) {
        DoctorResponse response = new DoctorResponse();
        response.setId(model.getId());
        response.setEmail(model.getAccountModel().getEmail());
        response.setImage(model.getImage());
        response.setFullName(model.getFullName());
        response.setGender(model.getGender());
        response.setPhone(model.getPhone());
        response.setBirthDate(model.getBirthDate());
        response.setDegree(model.getDegree());
        response.setWorkDay(model.getWorkDay());
        response.setStatus(model.getStatus());
        response.setDepartmentId(model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null);
        response.setDepartmentName(model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null);
        
        return response;
    }

    public static void convertFromCreateRequest(DoctorProfileModel model, AdminDoctorDTO.CreateDoctorRequest request) {
        model.setImage(request.getImage());
        model.setFullName(request.getFullName());
        model.setBirthDate(request.getBirthDate());
        model.setGender(request.getGender());
        model.setDegree(request.getDegree());
        model.setPhone(request.getPhone());
    }

    public static void convertFromUpdateRequest(DoctorProfileModel model, AdminDoctorDTO.UpdateDoctorRequest request) {
        model.setFullName(request.getFullName());
        model.setBirthDate(request.getBirthDate());
        model.setGender(request.getGender());
        model.setDegree(request.getDegree());
        model.setPhone(request.getPhone());
        model.setStatus(request.getStatus());
    }

    public static void convertFromUpdateWorkDayRequest(DoctorProfileModel model, AdminDoctorDTO.UpdateDoctorWorkDayRequest request) {
        model.setWorkDay(request.getWorkDay());
    }
}
