package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminMedicalPackageDTO;
import com.appointmenthostpital.server.models.MedicalPackageModel;
import com.appointmenthostpital.server.responses.MedicalPackageResponse;

public class MedicalPackageConvert {
    public static MedicalPackageResponse convertToResponse(MedicalPackageModel medicalPackageModel) {
        MedicalPackageResponse response = new MedicalPackageResponse();
        response.setId(medicalPackageModel.getId());
        response.setName(medicalPackageModel.getName());
        response.setDescription(medicalPackageModel.getDescription());
        response.setStatus(medicalPackageModel.getStatus());
        response.setPrice(medicalPackageModel.getPrice());
        return response;
    }

    public static void convertFromCreateRequest(MedicalPackageModel model,
            AdminMedicalPackageDTO.CreateMedicalPackageRequest request) {
        model.setName(request.getName());
        model.setDescription(request.getDescription());
        model.setStatus(request.getStatus());
        model.setPrice(request.getPrice());
    }

    public static void convertFromUpdateRequest(MedicalPackageModel model,
            AdminMedicalPackageDTO.UpdateMedicalPackageRequest request) {
        model.setName(request.getName());
        model.setDescription(request.getDescription());
        model.setStatus(request.getStatus());
        model.setPrice(request.getPrice());
    }
}