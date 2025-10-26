package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appointmenthostpital.server.converts.MedicineCategoryConvert;
import com.appointmenthostpital.server.dtos.admin.AdminMedicineCategoryDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.MedicineCategoryModel;
import com.appointmenthostpital.server.repositories.MedicineCategoryRepository;
import com.appointmenthostpital.server.responses.MedicineCategoryResponse;

@Service
@Transactional
public class MedicineCategoryService {

    @Autowired
    private MedicineCategoryRepository medicineCategoryRepository;

    public MedicineCategoryModel getCategoryById(Long id) {
        return medicineCategoryRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy danh mục thuốc"));
    }

    public List<MedicineCategoryResponse> handleGetMedicineCategoryList() {
        List<MedicineCategoryModel> modelCategoryModels = medicineCategoryRepository.findAll();
        return modelCategoryModels.stream().map(MedicineCategoryConvert::convertToResponse).toList();
    }

    public MedicineCategoryResponse handleCreateMedicineCategory(AdminMedicineCategoryDTO.CreateCategoryRequest request) {
        MedicineCategoryModel modelCategoryModel = new MedicineCategoryModel();
        MedicineCategoryConvert.convertFromCreateRequest(modelCategoryModel, request);
        
        modelCategoryModel = this.medicineCategoryRepository.save(modelCategoryModel);
        return MedicineCategoryConvert.convertToResponse(modelCategoryModel);
    }

    public MedicineCategoryResponse handleUpdateMedicineCategory(Long id, AdminMedicineCategoryDTO.UpdateCategoryRequest request) {
        MedicineCategoryModel category = this.getCategoryById(id);
        MedicineCategoryConvert.convertFromUpdateRequest(category, request);
        
        category = this.medicineCategoryRepository.save(category);
        return MedicineCategoryConvert.convertToResponse(category);
    }
}
