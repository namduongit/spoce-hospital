package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.services.DoctorService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
        @Autowired
        DoctorService doctorService;

        /**
         * Get list of doctors
         * 
         * @return
         */
        @GetMapping("")
        public ResponseEntity<RestResponse<List<DoctorResponse>>> handleGetDoctorList() {
                List<DoctorResponse> doctorModels = this.doctorService.handleGetDoctorList();
                return ResponseEntity.ok().body(new RestResponse<List<DoctorResponse>>(200, true,
                                doctorModels, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        /**
         * Create a new doctor
         * 
         * @param request
         * @return
         */
        @PostMapping("")
        public ResponseEntity<RestResponse<DoctorResponse>> handleCreateDoctor(
                        @Valid @RequestBody AdminDoctorDTO.CreateDoctorRequest request) {

                DoctorResponse response = doctorService.handleCreateDoctor(request);
                return ResponseEntity.ok(new RestResponse<DoctorResponse>(200, true,
                                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        /**
         * Update a doctor
         * 
         * @param id
         * @param request
         * @return
         */
        @PutMapping("/{id}")
        public ResponseEntity<RestResponse<DoctorResponse>> handleUpdateDoctor(
                        @PathVariable(name = "id", required = true) Long id,
                        @RequestBody AdminDoctorDTO.UpdateDoctorRequest request) {
                DoctorResponse response = doctorService.handleUpdateDoctor(id, request);
                return ResponseEntity.ok(new RestResponse<DoctorResponse>(200, true,
                                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        /**
         * Delete a doctor
         * 
         * @param id
         * @return
         */
        @DeleteMapping("/{id}")
        public ResponseEntity<RestResponse<?>> handleDeleteDoctor(@PathVariable(name = "id", required = true) Long id) {
                this.doctorService.handleDeleteDoctor(id);
                return ResponseEntity.ok(new RestResponse<>(200, true,
                                null, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }
}
