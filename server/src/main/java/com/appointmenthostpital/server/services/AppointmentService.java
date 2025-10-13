package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.exceptions.NotAllowedException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.repositories.AppointmentRepository;
import com.appointmenthostpital.server.responses.AppointmentResponse;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private DoctorService doctorService;

    public AppointmentModel getAppointmentById(Long id) {
        return this.appointmentRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy lịch hẹn"));
    }

    public AppointmentModel handleCreateAppointment(AppointmentModel appointment) {
        return this.appointmentRepository.save(appointment);
    }

    public List<AppointmentResponse> handleGetAppointmentList() {
        List<AppointmentModel> appointmentModels = this.appointmentRepository.findAll();
        List<AppointmentResponse> appointmentResponses = appointmentModels.stream().map(appointmentModel -> {
            AppointmentResponse response = new AppointmentResponse();
            response.setId(appointmentModel.getId());
            response.setFullName(appointmentModel.getFullName());
            response.setPhone(appointmentModel.getPhone());
            response.setTime(appointmentModel.getTime().toString());
            response.setNote(appointmentModel.getNote());
            response.setStatus(appointmentModel.getStatus());
            response.setCreatedAt(appointmentModel.getCreatedAt().toString());

            if (appointmentModel.getUserModel() != null) {
                response.setEmail(appointmentModel.getUserModel().getEmail());
            }
            if (appointmentModel.getDepartmentModel() != null) {
                response.setDepartmentId(appointmentModel.getDepartmentModel().getId());
                response.setDepartmentName(appointmentModel.getDepartmentModel().getName());
            }
            if (appointmentModel.getRoomModel() != null) {
                response.setRoomId(appointmentModel.getRoomModel().getId());
                response.setRoomName(appointmentModel.getRoomModel().getName());
            }
            if (appointmentModel.getDoctorModel() != null) {
                response.setDoctorId(appointmentModel.getDoctorModel().getId());
                response.setDoctorName(appointmentModel.getDoctorModel().getDoctorProfileModel().getFullName());
            }

            return response;
        }).toList();
        return appointmentResponses;
    }

    public AppointmentResponse handleUpdateAppointment(Long id, AdminAppointmentDTO.UpdateAppointmentRequest request) {
        AppointmentModel appointmentModel = this.getAppointmentById(id);

        if (appointmentModel.getStatus().equals("COMPLETED") || appointmentModel.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể cập nhật lịch hẹn đã hoàn thành hoặc đã hủy");
        }

        if (request.getDepartmentId() != null) {
            appointmentModel.setDepartmentModel(this.departmentService.getDepartmentById(request.getDepartmentId()));
        }
        if (request.getRoomId() != null) {
            appointmentModel.setRoomModel(this.roomService.getRoomById(request.getRoomId()));
        }
        if (request.getDoctorId() != null) {
            appointmentModel.setDoctorModel(this.doctorService.getDoctorById(request.getDoctorId()).getUserModel());
        }
        if (request.getPhone() != null) {
            appointmentModel.setPhone(request.getPhone());
        }
        if (request.getTime() != null) {
            appointmentModel.setTime(request.getTime());
        }
        if (request.getNote() != null) {
            appointmentModel.setNote(request.getNote());
        }
        if (request.getStatus() != null) {
            appointmentModel.setStatus(request.getStatus());
        }

        appointmentModel = this.appointmentRepository.save(appointmentModel);

        AppointmentResponse response = new AppointmentResponse();
        response.setId(appointmentModel.getId());
        response.setFullName(appointmentModel.getFullName());
        response.setPhone(appointmentModel.getPhone());
        response.setTime(appointmentModel.getTime().toString());
        response.setNote(appointmentModel.getNote());
        response.setStatus(appointmentModel.getStatus());
        response.setCreatedAt(appointmentModel.getCreatedAt().toString());

        if (appointmentModel.getUserModel() != null) {
            response.setEmail(appointmentModel.getUserModel().getEmail());
        }
        if (appointmentModel.getDepartmentModel() != null) {
            response.setDepartmentId(appointmentModel.getDepartmentModel().getId());
            response.setDepartmentName(appointmentModel.getDepartmentModel().getName());
        }
        if (appointmentModel.getRoomModel() != null) {
            response.setRoomId(appointmentModel.getRoomModel().getId());
            response.setRoomName(appointmentModel.getRoomModel().getName());
        }
        if (appointmentModel.getDoctorModel() != null) {
            response.setDoctorId(appointmentModel.getDoctorModel().getId());
            response.setDoctorName(appointmentModel.getDoctorModel().getDoctorProfileModel().getFullName());
        }

        return response;
    }

    public void handleDeleteAppointment(Long id) {
        AppointmentModel appointmentModel = this.getAppointmentById(id);

        if (appointmentModel.getStatus().equals("COMPLETED")) {
            throw new NotAllowedException("Không thể xóa lịch hẹn đã hoàn thành");
        }
        if (appointmentModel.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể xóa lịch hẹn đã hủy");
        }
        this.appointmentRepository.delete(appointmentModel);
    }
}
