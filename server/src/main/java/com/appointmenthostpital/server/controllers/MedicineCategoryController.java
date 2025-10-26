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
import com.appointmenthostpital.server.dtos.admin.AdminMedicineCategoryDTO;
import com.appointmenthostpital.server.responses.MedicineCategoryResponse;
import com.appointmenthostpital.server.services.MedicineCategoryService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicine-categories")
public class MedicineCategoryController {

    @Autowired
    private MedicineCategoryService medicineCategoryService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<MedicineCategoryResponse>>> handleGetMedicineCategoryList() {
        List<MedicineCategoryResponse> response = this.medicineCategoryService.handleGetMedicineCategoryList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<MedicineCategoryResponse>>(
                HttpStatusResponse.OK,
                true,
                response, 
                HttpStatusResponse.SUCCESS_MESSAGE, 
                null
        ));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<MedicineCategoryResponse>> handleCreateMedicineCategory(@Valid @RequestBody AdminMedicineCategoryDTO.CreateCategoryRequest request) {
        MedicineCategoryResponse response = this.medicineCategoryService.handleCreateMedicineCategory(request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<MedicineCategoryResponse>(
                HttpStatusResponse.CREATED,
                true,
                response, 
                HttpStatusResponse.SUCCESS_MESSAGE, 
                null
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestResponse<MedicineCategoryResponse>> handleUpdateMedicineCategory(
        @PathVariable(name = "id", required = true) Long id,
        @Valid @RequestBody AdminMedicineCategoryDTO.UpdateCategoryRequest request) {
        MedicineCategoryResponse response = this.medicineCategoryService.handleUpdateMedicineCategory(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<MedicineCategoryResponse>(
                HttpStatusResponse.OK,
                true,
                response, 
                HttpStatusResponse.SUCCESS_MESSAGE, 
                null
        ));
    }
}