package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.AppointmentConvert;
import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.exceptions.NotAllowedException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.repositories.AppointmentRepository;
import com.appointmenthostpital.server.responses.AppointmentResponse;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private RoomService roomService;

    public AppointmentModel getAppointmentById(Long id) {
        return this.appointmentRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy lịch hẹn"));
    }

    public AppointmentModel createAppointment(AppointmentModel appointmentModel) {
        return this.appointmentRepository.save(appointmentModel);
    }

    public List<AppointmentResponse> handleGetAppointmentList() {
        List<AppointmentModel> appointmentModels = this.appointmentRepository.findAll();
        return appointmentModels.stream().map(AppointmentConvert::convertToResponse).toList();
    }

    public List<AppointmentResponse> handleGetAppointmentsByDoctorAndStatus(Authentication authentication, String status) {
        String email = authentication.getName();
        AccountModel accountModel = this.accountService.getUserByEmail(email);
        List<AppointmentModel> appointmentModels = this.appointmentRepository.findByDoctorIdAndStatus(accountModel.getId(), status);
        return appointmentModels.stream().map(AppointmentConvert::convertToResponse).toList();
    }   

    public AppointmentResponse handleUpdateAppointment(Long id, AdminAppointmentDTO.UpdateAppointmentRequest request) {
        AppointmentModel appointmentModel = this.getAppointmentById(id);
        if (appointmentModel.getStatus().equals("COMPLETED") || appointmentModel.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể cập nhật lịch hẹn đã hoàn thành hoặc đã hủy");
        }

        appointmentModel.setDepartmentModel(departmentService.getDepartmentById(request.getDepartmentId()));
        appointmentModel.setDoctorModel(accountService.getUserById(request.getDoctorId()));
        appointmentModel.setRoomModel(roomService.getRoomById(request.getRoomId()));

        AppointmentConvert.convertFromUpdateRequest(appointmentModel, request);
        appointmentModel = this.appointmentRepository.save(appointmentModel);
        return AppointmentConvert.convertToResponse(appointmentModel);
    }

    public AppointmentResponse handleChangeStatusAppointment(Long id, AdminAppointmentDTO.ChangeStatusRequest request) {
        AppointmentModel appointmentModel = this.getAppointmentById(id);
        if (appointmentModel.getStatus().equals("COMPLETED") || appointmentModel.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể cập nhật lịch hẹn đã hoàn thành hoặc đã hủy");
        }

        appointmentModel.setStatus(request.getStatus());
        appointmentModel = this.appointmentRepository.save(appointmentModel);
        return AppointmentConvert.convertToResponse(appointmentModel);
    }

    public void handleDeleteAppointment(Long id) {
        AppointmentModel appointmentModel = this.getAppointmentById(id);
        if (appointmentModel.getStatus().equals("COMPLETED") || appointmentModel.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể xóa lịch hẹn đã hoàn thành hoặc đã hủy");
        }
        this.appointmentRepository.delete(appointmentModel);
    }
}
