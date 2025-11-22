package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.responses.MedicalPackageResponse;
import com.appointmenthostpital.server.services.DoctorService;
import com.appointmenthostpital.server.services.MedicalPackageService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    @Autowired
    private MedicalPackageService medicalPackageService;

    @GetMapping("/medical-packages")
    public ResponseEntity<RestResponse<List<MedicalPackageResponse>>> handleGetMedicalPackageList() {
        List<MedicalPackageResponse> response = this.medicalPackageService.handleGetMedicalPackageList();
        return ResponseEntity.status(HttpStatusResponse.OK)
                .body(new RestResponse<List<MedicalPackageResponse>>(HttpStatusResponse.OK, true,
                        response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/doctors")
    public ResponseEntity<RestResponse<List<DoctorResponse>>> handleGetDoctorList() {
        List<DoctorResponse> responses = this.doctorService.handleGetDoctorList();
        return ResponseEntity.status(HttpStatusResponse.OK)
                .body(new RestResponse<List<DoctorResponse>>(HttpStatusResponse.OK, true,
                        responses, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }
}
