package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.DepartmentModel;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.repositories.DoctorProfileRepository;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.utils.ValidPassword;

@Service
public class DoctorService {
    @Autowired
    private DoctorProfileRepository doctorProfileRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private DepartmentService departmentService;

    public DoctorProfileModel getDoctorById(Long id) {
        return this.doctorProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bác sĩ"));
    }

    public List<DoctorResponse> handleGetDoctorList() {
        List<DoctorProfileModel> doctorProfileModels = this.doctorProfileRepository.findAll();
        List<DoctorResponse> doctorResponses = doctorProfileModels.stream().map(doctorProfileModel -> {
            DoctorResponse response = new DoctorResponse();
            response.setId(doctorProfileModel.getId());
            response.setEmail(doctorProfileModel.getUserModel().getEmail());

            response.setImage(doctorProfileModel.getImage());
            response.setFullName(doctorProfileModel.getFullName());
            response.setPhone(doctorProfileModel.getPhone());
            response.setBirthDate(doctorProfileModel.getBirthDate());
            response.setGender(doctorProfileModel.getGender());
            response.setDegree(doctorProfileModel.getDegree());
            response.setWorkDay(doctorProfileModel.getWorkDay());
            response.setStatus(doctorProfileModel.getStatus());

            if (doctorProfileModel.getDepartmentModel() != null) {
                response.setDepartmentId(doctorProfileModel.getDepartmentModel().getId());
                response.setDepartmentName(doctorProfileModel.getDepartmentModel().getName());
            }
            return response;
        }).toList();
        return doctorResponses;
    }

    public DoctorResponse handleCreateDoctor(AdminDoctorDTO.CreateDoctorRequest request) {
        if (!ValidPassword.comparePassword(request.getPassword(), request.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu xác nhận không khớp");
        }

        String encodePassword = ValidPassword.encodePassword(request.getPassword());

        UserModel userModel = new UserModel();
        userModel.setEmail(request.getEmail());
        userModel.setPassword(encodePassword);
        userModel.setRole("DOCTOR");

        DoctorProfileModel doctorProfileModel = new DoctorProfileModel();
        doctorProfileModel.setFullName(request.getFullName());
        doctorProfileModel.setBirthDate(request.getBirthDate());
        doctorProfileModel.setGender(request.getGender());
        doctorProfileModel.setDegree(request.getDegree());
        doctorProfileModel.setPhone(request.getPhone());
        doctorProfileModel.setImage(request.getImage());

        DepartmentModel departmentModel = this.departmentService.getDepartmentById(request.getDepartmentId());
        doctorProfileModel.setDepartmentModel(departmentModel);
        doctorProfileModel.setUserModel(userModel);

        userModel.setDoctorProfileModel(doctorProfileModel);

        userModel = this.userService.save(userModel);
        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);

        DoctorResponse response = new DoctorResponse();
        response.setEmail(userModel.getEmail());

        response.setId(doctorProfileModel.getId());
        response.setImage(doctorProfileModel.getImage());
        response.setFullName(doctorProfileModel.getFullName());
        response.setBirthDate(doctorProfileModel.getBirthDate());
        response.setGender(doctorProfileModel.getGender());
        response.setPhone(doctorProfileModel.getPhone());
        response.setDegree(doctorProfileModel.getDegree());
        response.setWorkDay(doctorProfileModel.getWorkDay());
        response.setStatus(doctorProfileModel.getStatus());

        response.setDepartmentId(departmentModel.getId());
        response.setDepartmentName(departmentModel.getName());

        return response;
    }

    public DoctorResponse handleUpdateDoctor(Long id, AdminDoctorDTO.UpdateDoctorRequest request) {
        DoctorProfileModel doctorProfileModel = this.getDoctorById(id);

        if (request.getImage() != null) {
            doctorProfileModel.setImage(request.getImage());
        }
        if (request.getFullName() != null) {
            doctorProfileModel.setFullName(request.getFullName());
        }
        if (request.getBirthDate() != null) {
            doctorProfileModel.setBirthDate(request.getBirthDate());
        }
        if (request.getGender() != null) {
            doctorProfileModel.setGender(request.getGender());
        }
        if (request.getPhone() != null) {
            doctorProfileModel.setPhone(request.getPhone());
        }
        if (request.getDegree() != null) {
            doctorProfileModel.setDegree(request.getDegree());
        }
        if (request.getWorkDay() != null) {
            doctorProfileModel.setWorkDay(request.getWorkDay());
        }
        if (request.getStatus() != null) {
            doctorProfileModel.setStatus(request.getStatus());
        }

        if (request.getDepartmentId() != null) {
            DepartmentModel departmentModel = this.departmentService.getDepartmentById(request.getDepartmentId());
            doctorProfileModel.setDepartmentModel(departmentModel);
        }

        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);

        DoctorResponse response = new DoctorResponse();
        response.setId(doctorProfileModel.getId());
        response.setEmail(doctorProfileModel.getUserModel().getEmail());
        response.setFullName(doctorProfileModel.getFullName());
        response.setBirthDate(doctorProfileModel.getBirthDate());
        response.setGender(doctorProfileModel.getGender());
        response.setPhone(doctorProfileModel.getPhone());
        response.setDegree(doctorProfileModel.getDegree());
        response.setDepartmentId(doctorProfileModel.getDepartmentModel().getId());
        response.setDepartmentName(doctorProfileModel.getDepartmentModel().getName());

        return response;
    }

    public void handleDeleteDoctor(Long id) {
        DoctorProfileModel doctorProfileModel = this.getDoctorById(id);
        UserModel userModel = doctorProfileModel.getUserModel();
        this.userService.delete(userModel);
    }
}
