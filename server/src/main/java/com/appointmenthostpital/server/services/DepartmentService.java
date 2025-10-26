package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.DepartmentConvert;
import com.appointmenthostpital.server.dtos.admin.AdminDepartmentDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;

import com.appointmenthostpital.server.models.DepartmentModel;

import com.appointmenthostpital.server.repositories.DepartmentRepository;

import com.appointmenthostpital.server.responses.DepartmentResponse;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public DepartmentModel getDepartmentById(Long id) {
        return this.departmentRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy khoa khám"));
    }

    public List<DepartmentResponse> handleGetDepartmentList() {
        List<DepartmentModel> models = this.departmentRepository.findAll();
        return models.stream().map(DepartmentConvert::convertToResponse).toList();
    }

    public DepartmentResponse handleCreateDepartment(AdminDepartmentDTO.CreateDepartmentRequest request) {
        DepartmentModel model = new DepartmentModel();
        model.setName(request.getName());

        model = this.departmentRepository.save(model);
        return DepartmentConvert.convertToResponse(model);
    }
}
