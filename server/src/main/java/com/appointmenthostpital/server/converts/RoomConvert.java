package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.models.RoomModel;
import com.appointmenthostpital.server.responses.RoomResponse;

public class RoomConvert {
    public static RoomResponse convertToResponse(RoomModel model) {
        RoomResponse response = new RoomResponse();
        response.setId(model.getId());
        response.setName(model.getName());
        response.setStatus(model.getStatus());
        response.setDepartmentId(model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null);
        response.setDepartmentName(model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null);
        
        return response;
    }

    public static void convertFromCreateRequest(RoomModel roomModel, AdminRoomDTO.CreateRoomRequest request) {
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());
    }

    public static void convertFromUpdateRequest(RoomModel roomModel, AdminRoomDTO.UpdateRoomRequest request) {
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());
    }
}
