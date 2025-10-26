package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.responses.AppointmentResponse;
import com.appointmenthostpital.server.services.AppointmentService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<AppointmentResponse>>> handleGetAppointmentList() {
        List<AppointmentResponse> response = this.appointmentService.handleGetAppointmentList();
        return ResponseEntity.status(HttpStatusResponse.OK)
                .body(new RestResponse<List<AppointmentResponse>>(HttpStatusResponse.OK, true,
                        response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestResponse<AppointmentResponse>> handleUpdateAppointment(
            @PathVariable(name = "id", required = true) Long id,
            @Valid @RequestBody AdminAppointmentDTO.UpdateAppointmentRequest request) {

        AppointmentResponse response = this.appointmentService.handleUpdateAppointment(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<AppointmentResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RestResponse<?>> handleDeleteAppointment(
            @PathVariable(name = "id", required = true) Long id) {
        this.appointmentService.handleDeleteAppointment(id);
        return ResponseEntity.ok().body(new RestResponse<>(
                HttpStatusResponse.OK,
                true,
                null,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    /** 
     * @Controller used by doctor to get all confirmed appointments
     */
    @GetMapping("/doctor")
    public ResponseEntity<RestResponse<List<AppointmentResponse>>> handleGetAppointmentsByDoctorAndStatus(
            Authentication authentication) {
        List<AppointmentResponse> response = this.appointmentService
                .handleGetAppointmentsByDoctorAndStatus(authentication, "CONFIRMED");
        return ResponseEntity.status(HttpStatusResponse.OK)
                .body(new RestResponse<List<AppointmentResponse>>(HttpStatusResponse.OK, true,
                        response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }
    
    /**
     * @Controller used by doctor to change status appointment
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<RestResponse<AppointmentResponse>> handleChangeStatusAppointment(
        @PathVariable(name = "id", required = true) Long id,
        @Valid @RequestBody AdminAppointmentDTO.ChangeStatusRequest request) {

        AppointmentResponse response = this.appointmentService.handleChangeStatusAppointment(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<AppointmentResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}