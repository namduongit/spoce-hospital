package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminDepartmentDTO;
import com.appointmenthostpital.server.responses.DepartmentResponse;
import com.appointmenthostpital.server.services.DepartmentService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    /**
     * Get list of departments
     * 
     * @return
     */
    @GetMapping("")
    public ResponseEntity<RestResponse<List<DepartmentResponse>>> handleGetDepartmentList() {
        List<DepartmentResponse> response = this.departmentService.handleGetDepartmentList();
        return ResponseEntity.ok().body(new RestResponse<List<DepartmentResponse>>(200, true,
                response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    /**
     * Create new department
     * 
     * @param createDepartmentRequest
     * @return
     */
    @PostMapping("")
    public ResponseEntity<RestResponse<DepartmentResponse>> handleCreateDepartment(
            @Valid @RequestBody AdminDepartmentDTO.CreateDepartmentRequest request) {
        DepartmentResponse response = this.departmentService.handleCreateDepartment(request);
        return ResponseEntity.ok().body(new RestResponse<DepartmentResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}
