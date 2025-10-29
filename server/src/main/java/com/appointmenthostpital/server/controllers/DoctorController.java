package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        private DoctorService doctorService;

        @GetMapping("")
        public ResponseEntity<RestResponse<List<DoctorResponse>>> handleGetDoctorList() {
                List<DoctorResponse> responses = this.doctorService.handleGetDoctorList();
                return ResponseEntity.status(HttpStatusResponse.OK)
                                .body(new RestResponse<List<DoctorResponse>>(HttpStatusResponse.OK, true,
                                                responses, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        @PostMapping("")
        public ResponseEntity<RestResponse<DoctorResponse>> handleCreateDoctor(
                        @Valid @RequestBody AdminDoctorDTO.CreateDoctorRequest request) {

                DoctorResponse response = doctorService.handleCreateDoctor(request);
                return ResponseEntity.status(HttpStatusResponse.CREATED)
                                .body(new RestResponse<DoctorResponse>(HttpStatusResponse.CREATED, true,
                                                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        @PutMapping("/{id}")
        public ResponseEntity<RestResponse<DoctorResponse>> handleUpdateDoctor(
                        @PathVariable(name = "id", required = true) Long id,
                        @Valid @RequestBody AdminDoctorDTO.UpdateDoctorRequest request) {
                DoctorResponse response = doctorService.handleUpdateDoctor(id, request);
                return ResponseEntity.status(HttpStatusResponse.OK)
                                .body(new RestResponse<DoctorResponse>(HttpStatusResponse.OK, true,
                                                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        @PutMapping("/{id}/work-day")
        public ResponseEntity<RestResponse<DoctorResponse>> handleUpdateDoctorWorkDay(
                        @PathVariable(name = "id", required = true) Long id,
                        @Valid @RequestBody AdminDoctorDTO.UpdateDoctorWorkDayRequest request) {

                DoctorResponse response = doctorService.handleUpdateDoctorWorkDay(id, request);
                return ResponseEntity.status(HttpStatusResponse.OK)
                                .body(new RestResponse<DoctorResponse>(HttpStatusResponse.OK, true,
                                                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        @PutMapping("/{id}/image-avatar")
        public ResponseEntity<RestResponse<DoctorResponse>> handleUpdateDoctorImageAvatar(
                        @PathVariable(name = "id", required = true) Long id,
                        @RequestParam(name = "file", required = true) MultipartFile file) {
                DoctorResponse response = this.doctorService.handleUpdateDoctorImageAvatar(id, file);
                return ResponseEntity.status(HttpStatusResponse.OK)
                                .body(new RestResponse<DoctorResponse>(HttpStatusResponse.OK, true,
                                                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }
}
