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

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminMedicineDTO;
import com.appointmenthostpital.server.responses.MedicineResponse;
import com.appointmenthostpital.server.services.MedicineService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<MedicineResponse>>> handleGetMedicineList() {
        List<MedicineResponse> response = this.medicineService.handleGetMedicineList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<MedicineResponse>> handleCreateMedicine(
            @Valid @RequestBody AdminMedicineDTO.CreateMedicineRequest request) {
        MedicineResponse response = this.medicineService.handleCreateMedicine(request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestResponse<MedicineResponse>> handleUpdateMedicine(
            @PathVariable Long id,
            @Valid @RequestBody AdminMedicineDTO.UpdateMedicineRequest request) {
        MedicineResponse response = this.medicineService.handleUpdateMedicine(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}
