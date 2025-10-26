package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.DepartmentModel;
import com.appointmenthostpital.server.responses.DepartmentResponse;

public class DepartmentConvert {
    public static DepartmentResponse convertToResponse(DepartmentModel model) {
        DepartmentResponse response = new DepartmentResponse();
        response.setId(model.getId());
        response.setName(model.getName());
        response.setRooms(model.getRoomModels() != null ? model.getRoomModels().stream().map(RoomConvert::convertToResponse).toList() : null);
        response.setDoctors(model.getDoctorProfileModels() != null ? model.getDoctorProfileModels().stream().map(DoctorConvert::convertToResponse).toList() : null);
        response.setAppointments(model.getAppointmentModels() != null ? model.getAppointmentModels().stream().map(AppointmentConvert::convertToResponse).toList() : null);
        
        return response;    
    }

    public static void convertFromUpdateRequest(DepartmentModel model, String name) {
        model.setName(name);
    }   
}