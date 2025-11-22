package com.appointmenthostpital.server.controllers;

import java.util.List;

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
import com.appointmenthostpital.server.dtos.user.SendContactDTO;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.responses.AccountDetail;
import com.appointmenthostpital.server.responses.AppointmentResponse;
import com.appointmenthostpital.server.responses.PrescriptionInvoiceResponse;
import com.appointmenthostpital.server.responses.ServiceInvoiceResponse;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patient")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/details")
    public ResponseEntity<RestResponse<AccountDetail.ProfileDetailResponse>> handleGetAccountDetail(
            Authentication authentication) {
        AccountDetail.ProfileDetailResponse response = this.userService.handleGetAccountDetail(authentication);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<AccountDetail.ProfileDetailResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/details")
    public ResponseEntity<RestResponse<AccountDetail.ProfileDetailResponse>> handleUpdateProfile(
            Authentication authentication,
            @Valid @RequestBody UserUpdateDTO.UpdateProfileRequest request) {
        AccountDetail.ProfileDetailResponse response = this.userService.handleUpdateProfile(authentication, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<AccountDetail.ProfileDetailResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PostMapping("/appointments")
    public ResponseEntity<RestResponse<AppointmentResponse>> handeCreateAppointment(Authentication authentication,
            @Valid @RequestBody UserAppointmentDTO.CreateAppointmentRequest request) {
        AppointmentResponse response = this.userService.handleCreateAppointment(authentication, request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<AppointmentResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @GetMapping("/appointments")
    public ResponseEntity<RestResponse<List<AppointmentResponse>>> handleGetAppointmentList(
            Authentication authentication) {
        List<AppointmentResponse> response = this.userService.handleGetAppointmentList(authentication);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<AppointmentResponse>>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @GetMapping("/service-invoices")
    public ResponseEntity<RestResponse<List<ServiceInvoiceResponse>>> handleGetServiceInvoiceList(
            Authentication authentication) {
        List<ServiceInvoiceResponse> response = this.userService.handleGetServiceInvoiceList(authentication);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<ServiceInvoiceResponse>>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @GetMapping("/prescription-invoices")
    public ResponseEntity<RestResponse<List<PrescriptionInvoiceResponse>>> handleGetPrescriptionInvoiceList(
            Authentication authentication) {
        List<PrescriptionInvoiceResponse> response = this.userService.handleGetPrescriptionInvoiceList(authentication);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<PrescriptionInvoiceResponse>>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PostMapping("/send-contact")
    public ResponseEntity<RestResponse<?>> handleSendContact(@Valid @RequestBody SendContactDTO request) {
        this.userService.handleSendContact(request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<Object>(
                HttpStatusResponse.OK,
                true,
                null,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}
