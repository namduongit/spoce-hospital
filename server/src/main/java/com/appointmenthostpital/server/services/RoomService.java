package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.models.DepartmentModel;
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
        List <RoomModel> roomModels = this.roomRepository.findAll();
        return roomModels.stream().map(roomModel -> {
            RoomResponse response = new RoomResponse();
            response.setId(roomModel.getId());
            response.setName(roomModel.getName());
            response.setStatus(roomModel.getStatus());
            response.setDepartmentId(roomModel.getDepartmentModel().getId());
            response.setDepartmentName(roomModel.getDepartmentModel().getName());
            return response;
        }).toList();
    }

    public RoomResponse handleCreateRoom(AdminRoomDTO.CreateRoomRequest request) {
        RoomModel roomModel = new RoomModel();
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());

        roomModel.setDepartmentModel(this.departmentService.getDepartmentById(request.getDepartmentId()));
        roomModel = this.roomRepository.save(roomModel);

        RoomResponse response = new RoomResponse();
        response.setId(roomModel.getId());
        response.setName(roomModel.getName());
        response.setStatus(roomModel.getStatus());
        response.setDepartmentId(roomModel.getDepartmentModel().getId());
        response.setDepartmentName(roomModel.getDepartmentModel().getName());
        return response;
    }

    public RoomResponse handleUpdateRoom(Long id, AdminRoomDTO.UpdateRoomRequest request) {
        RoomModel roomModel = this.getRoomById(id);
        DepartmentModel departmentModel = this.departmentService.getDepartmentById(request.getDepartmentId());
        
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());
        roomModel.setDepartmentModel(departmentModel);
        roomModel = this.roomRepository.save(roomModel);

        RoomResponse response = new RoomResponse();
        response.setId(roomModel.getId());
        response.setName(roomModel.getName());
        response.setStatus(roomModel.getStatus());
        response.setDepartmentId(roomModel.getDepartmentModel().getId());
        response.setDepartmentName(roomModel.getDepartmentModel().getName());
        return response;
    }

    public void handleDeleteRoom(Long id) {
        RoomModel roomModel = this.getRoomById(id);
        this.roomRepository.delete(roomModel);
    }
}
