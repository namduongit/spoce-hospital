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
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.services.MedicalPackageService;
import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminMedicalPackageDTO;
import com.appointmenthostpital.server.responses.MedicalPackageResponse;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medical-packages")
public class MedicalPackageController {
    @Autowired
    private MedicalPackageService medicalPackageService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<MedicalPackageResponse>>> handleGetMedicalPackageList() {
        List<MedicalPackageResponse> response = this.medicalPackageService.handleGetMedicalPackageList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<MedicalPackageResponse>>(HttpStatusResponse.OK, true,
                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<MedicalPackageResponse>> handleCreateMedicalPackage(
            @Valid @RequestBody AdminMedicalPackageDTO.CreateMedicalPackageRequest request) {
        MedicalPackageResponse response = this.medicalPackageService.handleCreateMedicalPackage(request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<MedicalPackageResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestResponse<MedicalPackageResponse>> handleUpdateMedicalPackage(
            @PathVariable(name = "id") Long id,
            @Valid @RequestBody AdminMedicalPackageDTO.UpdateMedicalPackageRequest request) {
        MedicalPackageResponse response = this.medicalPackageService.handleUpdateMedicalPackage(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<MedicalPackageResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RestResponse<MedicalPackageResponse>> handleChangeMedicalPackageStatus(
            @PathVariable(name = "id") Long id,
            @Valid @RequestBody AdminMedicalPackageDTO.ChangeMedicalPackageStatusRequest request) {
        MedicalPackageResponse response = this.medicalPackageService.handleChangeMedicalPackageStatus(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<MedicalPackageResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}