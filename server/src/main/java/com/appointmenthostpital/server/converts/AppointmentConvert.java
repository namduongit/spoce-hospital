package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.responses.AppointmentResponse;

public class AppointmentConvert {
    public static AppointmentResponse convertToResponse(AppointmentModel model) {

        AppointmentResponse response = new AppointmentResponse();
        response.setId(model.getId());
        response.setFullName(model.getFullName());
        response.setPhone(model.getPhone());
        response.setTime(model.getTime());
        response.setNote(model.getNote());
        response.setStatus(model.getStatus());
        response.setCreatedAt(model.getCreatedAt().toString());
        response.setEmail(model.getAccountModel() != null ? model.getAccountModel().getEmail() : null);
        response.setDepartmentId(model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null);
        response.setDepartmentName(model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null);
        response.setDoctorId(model.getDoctorModel() != null ? model.getDoctorModel().getId() : null);
        response.setDoctorName(model.getDoctorModel() != null ? model.getDoctorModel().getDoctorProfileModel().getFullName() : null);
        response.setRoomId(model.getRoomModel() != null ? model.getRoomModel().getId() : null);
        response.setRoomName(model.getRoomModel() != null ? model.getRoomModel().getName() : null); 

        return response;
    } 

    public static void convertFromUpdateRequest(AppointmentModel model, AdminAppointmentDTO.UpdateAppointmentRequest request) {
        model.setPhone(request.getPhone());
        model.setTime(request.getTime());
        model.setNote(request.getNote());
        model.setStatus(request.getStatus());
    }

    public static void convertFromCreateByUserRequest(AppointmentModel model, UserAppointmentDTO.CreateAppointmentRequest request) {
        model.setFullName(request.getFullName());
        model.setPhone(request.getPhone());
        model.setTime("Ngày: " + request.getDate() + ", Giờ: " + request.getTime());
        model.setNote(request.getNote());
    }
}
