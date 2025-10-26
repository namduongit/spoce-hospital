package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminMedicineCategoryDTO;
import com.appointmenthostpital.server.models.MedicineCategoryModel;
import com.appointmenthostpital.server.responses.MedicineCategoryResponse;

public class MedicineCategoryConvert {
    public static MedicineCategoryResponse convertToResponse(MedicineCategoryModel model) {
        int medicineCount = model.getMedicines() != null ? model.getMedicines().size() : 0;
        return new MedicineCategoryResponse(
            model.getId(),
            model.getName(),
            model.getDescription(),
            medicineCount
        );
    }

    public static void convertFromCreateRequest(MedicineCategoryModel model, AdminMedicineCategoryDTO.CreateCategoryRequest request) {
        model.setName(request.getName());
        model.setDescription(request.getDescription());
    }

    public static void convertFromUpdateRequest(MedicineCategoryModel model, AdminMedicineCategoryDTO.UpdateCategoryRequest request) {
        model.setName(request.getName());
        model.setDescription(request.getDescription());
    }   
}
