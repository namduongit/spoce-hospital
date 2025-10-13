package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminDepartmentDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.models.DepartmentModel;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.RoomModel;
import com.appointmenthostpital.server.repositories.DepartmentRepository;
import com.appointmenthostpital.server.responses.AppointmentResponse;
import com.appointmenthostpital.server.responses.DepartmentResponse;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.responses.RoomResponse;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public DepartmentModel getDepartmentById(Long id) {
        return this.departmentRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy khoa khám"));
    }

    public List<DepartmentResponse> handleGetDepartmentList() {
        List<DepartmentModel> departmentModels = this.departmentRepository.findAll();
        return departmentModels.stream().map(departmentModel -> {
            DepartmentResponse response = new DepartmentResponse();
            response.setId(departmentModel.getId());
            response.setName(departmentModel.getName());

            List<RoomModel> roomModels = departmentModel.getRoomModels();
            response.setRooms(roomModels.stream().map(roomModel -> {
                RoomResponse roomResponse = new RoomResponse();
                roomResponse.setId(roomModel.getId());
                roomResponse.setName(roomModel.getName());
                roomResponse.setStatus(roomModel.getStatus());
                return roomResponse;
            }).toList());
            
            List<DoctorProfileModel> doctorProfileModels = departmentModel.getDoctorProfileModels();
            response.setDoctors(doctorProfileModels.stream().map(doctorProfileModel -> {
                DoctorResponse doctorResponse = new DoctorResponse();
                doctorResponse.setId(doctorProfileModel.getId());
                doctorResponse.setFullName(doctorProfileModel.getFullName());
                doctorResponse.setBirthDate(doctorProfileModel.getBirthDate());
                doctorResponse.setGender(doctorProfileModel.getGender());
                doctorResponse.setDegree(doctorProfileModel.getDegree());
                doctorResponse.setPhone(doctorProfileModel.getPhone());
                doctorResponse.setImage(doctorProfileModel.getImage());
                doctorResponse.setEmail(doctorProfileModel.getUserModel().getEmail());
                doctorResponse.setStatus(doctorProfileModel.getUserModel().getStatus());
                return doctorResponse;
            }).toList()); 

            List<AppointmentModel> appointmentModels = departmentModel.getAppointmentModels();
            response.setAppointments(appointmentModels.stream().map(appointmentModel -> {
                AppointmentResponse appointmentResponse = new AppointmentResponse();
                appointmentResponse.setId(appointmentModel.getId());
                appointmentResponse.setFullName(appointmentModel.getFullName());
                appointmentResponse.setPhone(appointmentModel.getPhone());
                appointmentResponse.setTime(appointmentModel.getTime().toString());
                appointmentResponse.setNote(appointmentModel.getNote());
                appointmentResponse.setStatus(appointmentModel.getStatus());
                appointmentResponse.setCreatedAt(appointmentModel.getCreatedAt().toString());

                if (appointmentModel.getUserModel() != null) {
                    appointmentResponse.setEmail(appointmentModel.getUserModel().getEmail());
                }
                if (appointmentModel.getDepartmentModel() != null) {
                    appointmentResponse.setDepartmentId(appointmentModel.getDepartmentModel().getId());
                    appointmentResponse.setDepartmentName(appointmentModel.getDepartmentModel().getName());
                }
                if (appointmentModel.getRoomModel() != null) {
                    appointmentResponse.setRoomId(appointmentModel.getRoomModel().getId());
                    appointmentResponse.setRoomName(appointmentModel.getRoomModel().getName());
                }
                if (appointmentModel.getDoctorModel() != null) {
                    appointmentResponse.setDoctorId(appointmentModel.getDoctorModel().getId());
                    appointmentResponse.setDoctorName(appointmentModel.getDoctorModel().getDoctorProfileModel().getFullName());
                }

                return appointmentResponse;
            }).toList());


            return response;
        }).toList();
    }

    public DepartmentResponse handleCreateDepartment(
            AdminDepartmentDTO.CreateDepartmentRequest request) {
        DepartmentModel departmentModel = new DepartmentModel();
        departmentModel.setName(request.getName());
        departmentModel = this.departmentRepository.save(departmentModel);
        DepartmentResponse response = new DepartmentResponse();
        response.setId(departmentModel.getId());
        response.setName(departmentModel.getName());
        return response;
    }
}
