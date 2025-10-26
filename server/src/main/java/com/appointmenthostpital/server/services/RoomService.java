package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.RoomConvert;
import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.models.RoomModel;
import com.appointmenthostpital.server.repositories.RoomRepository;
import com.appointmenthostpital.server.responses.RoomResponse;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DepartmentService departmentService;

    public RoomModel getRoomById(Long id) {
        return this.roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));
    }

    public List<RoomResponse> handleGetRoomList() {
        List <RoomModel> models = this.roomRepository.findAll();
        return models.stream().map(RoomConvert::convertToResponse).toList();
    }

    public RoomResponse handleCreateRoom(AdminRoomDTO.CreateRoomRequest request) {
        RoomModel roomModel = new RoomModel();
        RoomConvert.convertFromCreateRequest(roomModel, request);
        
        roomModel.setDepartmentModel(this.departmentService.getDepartmentById(request.getDepartmentId()));
        roomModel = this.roomRepository.save(roomModel);
        return RoomConvert.convertToResponse(roomModel);
    }

    public RoomResponse handleUpdateRoom(Long id, AdminRoomDTO.UpdateRoomRequest request) {
        RoomModel roomModel = this.getRoomById(id);
        roomModel.setDepartmentModel(this.departmentService.getDepartmentById(request.getDepartmentId()));

        RoomConvert.convertFromUpdateRequest(roomModel, request);
        roomModel = this.roomRepository.save(roomModel);
        return RoomConvert.convertToResponse(roomModel);
    }

    public void handleDeleteRoom(Long id) {
        RoomModel roomModel = this.getRoomById(id);
        this.roomRepository.delete(roomModel);
    }
}
