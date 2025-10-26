package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminMedicineDTO;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.responses.MedicineResponse;

public class MedicineConvert {
    public static MedicineResponse convertToResponse(MedicineModel model) {
        MedicineResponse response = new MedicineResponse();

        response.setId(model.getId());
        response.setName(model.getName());
        response.setDescription(model.getDescription());
        response.setUnit(model.getUnit());
        response.setPrice(model.getPrice());
        response.setManufacturer(model.getManufacturer());
        response.setStatus(model.getStatus());
        response.setCurrentStock(model.getCurrentStock());
        response.setMinStock(model.getMinStock());
        response.setMaxStock(model.getMaxStock());
        if (model.getCategoryModel() != null) {
            response.setCategoryId(model.getCategoryModel().getId());
            response.setCategoryName(model.getCategoryModel().getName());
        }

        Integer currentStock = model.getCurrentStock();
        Integer minStock = model.getMinStock();
        response.setIsLowStock(currentStock != null && minStock != null && currentStock <= minStock);
        response.setIsOutOfStock("OUT_OF_STOCK".equals(model.getStatus()));

        return response;
    }

    public static void convertFromCreateRequest(MedicineModel model, AdminMedicineDTO.CreateMedicineRequest request) {
            model.setName(request.getName());
            model.setDescription(request.getDescription());
            model.setUnit(request.getUnit());
            model.setPrice(request.getPrice());
            model.setManufacturer(request.getManufacturer());
            model.setStatus(request.getStatus());
            model.setCurrentStock(request.getCurrentStock());
            model.setMinStock(request.getMinStock());
            model.setMaxStock(request.getMaxStock());
    }

    public static void convertFromUpdateRequest(MedicineModel model, AdminMedicineDTO.UpdateMedicineRequest request) {
            model.setName(request.getName());
            model.setDescription(request.getDescription());
            model.setUnit(request.getUnit());
            model.setPrice(request.getPrice());
            model.setManufacturer(request.getManufacturer());
            model.setStatus(request.getStatus());
            model.setMinStock(request.getMinStock());
            model.setMaxStock(request.getMaxStock());
    }
}
