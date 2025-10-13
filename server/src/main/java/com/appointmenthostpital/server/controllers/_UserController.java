package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.responses.AccountResponse;
import com.appointmenthostpital.server.responses.AppointmentResponse;
import com.appointmenthostpital.server.services.AppointmentService;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/public")
public class _UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/details")
    public ResponseEntity<RestResponse<AccountResponse>> handleGetDetail(Authentication authentication) {
        AccountResponse response = this.userService.handleGetAccountDetail(authentication);
        return ResponseEntity.ok().body(
                new RestResponse<AccountResponse>(
                        HttpStatusResponse.OK,
                        true,
                        response,
                        HttpStatusResponse.SUCCESS_MESSAGE,
                        null));
    }

    @PutMapping("/details")
    public ResponseEntity<RestResponse<AccountResponse>> handleUpdateProfile(
            Authentication authentication,
            @Valid @RequestBody UserUpdateDTO.UpdateProfileRequest updateRequest) {
        AccountResponse response = this.userService.handleUpdateProfile(authentication,
                updateRequest);

        return ResponseEntity.ok().body(
                new RestResponse<AccountResponse>(
                        HttpStatusResponse.OK,
                        true,
                        response,
                        HttpStatusResponse.SUCCESS_MESSAGE,
                        null));
    }

    /**
     * Create new appointment
     * 
     * @param authentication
     * @param request
     * @return
     */
    @PostMapping("/appointments")
    public ResponseEntity<RestResponse<AppointmentResponse>> handleCreateAppointment(
            Authentication authentication,
            @Valid @RequestBody UserAppointmentDTO.CreateAppointmentRequest request) {

        String email = authentication.getName();
        UserModel userModel = this.userService.getUserByEmail(email);

        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }

        System.out.println("Data from client: " + request.getFullName() + ", " + request.getPhone() + ", "
                + request.getDate() + ", " + request.getTime() + ", " + request.getNote());

        AppointmentModel appointment = new AppointmentModel();
        appointment.setFullName(request.getFullName());
        appointment.setPhone(request.getPhone());
        appointment.setTime("Ngày: " + request.getDate() + ", Giờ: " + request.getTime());
        appointment.setNote(request.getNote());
        appointment.setUserModel(userModel);

        AppointmentModel savedAppointment = this.appointmentService.handleCreateAppointment(appointment);

        AppointmentResponse response = new AppointmentResponse();
        response.setId(savedAppointment.getId());
        response.setFullName(savedAppointment.getFullName());
        response.setPhone(savedAppointment.getPhone());
        response.setTime(savedAppointment.getTime());
        response.setNote(savedAppointment.getNote());
        response.setStatus(savedAppointment.getStatus());
        response.setEmail(savedAppointment.getUserModel().getEmail());
        return ResponseEntity.ok().body(
                new RestResponse<AppointmentResponse>(
                        HttpStatusResponse.CREATED,
                        true,
                        response,
                        HttpStatusResponse.SUCCESS_MESSAGE,
                        null));
    }
}
