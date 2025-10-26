package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.MedicalPackageConvert;
import com.appointmenthostpital.server.dtos.admin.AdminMedicalPackageDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;

import com.appointmenthostpital.server.models.MedicalPackageModel;

import com.appointmenthostpital.server.repositories.MedicalPackageRepository;

import com.appointmenthostpital.server.responses.MedicalPackageResponse;

@Service
public class MedicalPackageService {
    @Autowired
    private MedicalPackageRepository medicalPackageRepository;

    public MedicalPackageModel getMedicalPackageModel(Long id) {
        return this.medicalPackageRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy gói dịch vụ y tế"));
    }

    public MedicalPackageModel getMedicalPackageById(Long id) {
        return this.medicalPackageRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy gói dịch vụ y tế"));
    }

    public List<MedicalPackageResponse> handleGetMedicalPackageList() {
        List<MedicalPackageModel> medicalPackageModels = this.medicalPackageRepository.findAll();
        return medicalPackageModels.stream().map(MedicalPackageConvert::convertToResponse).toList();
    }

    public MedicalPackageResponse handleCreateMedicalPackage(
            AdminMedicalPackageDTO.CreateMedicalPackageRequest request) {
        MedicalPackageModel medicalPackageModel = new MedicalPackageModel();
        MedicalPackageConvert.convertFromCreateRequest(medicalPackageModel, request);

        medicalPackageModel = this.medicalPackageRepository.save(medicalPackageModel);
        return MedicalPackageConvert.convertToResponse(medicalPackageModel);
    }

    public MedicalPackageResponse handleUpdateMedicalPackage(Long id,
            AdminMedicalPackageDTO.UpdateMedicalPackageRequest request) {
        MedicalPackageModel medicalPackageModel = this.getMedicalPackageModel(id);
        MedicalPackageConvert.convertFromUpdateRequest(medicalPackageModel, request);

        medicalPackageModel = this.medicalPackageRepository.save(medicalPackageModel);
        return MedicalPackageConvert.convertToResponse(medicalPackageModel);
    }

    public MedicalPackageResponse handleChangeMedicalPackageStatus(Long id,
            AdminMedicalPackageDTO.ChangeMedicalPackageStatusRequest request) {
        MedicalPackageModel medicalPackageModel = this.getMedicalPackageModel(id);
        medicalPackageModel.setStatus(request.getStatus());

        medicalPackageModel = this.medicalPackageRepository.save(medicalPackageModel);
        return MedicalPackageConvert.convertToResponse(medicalPackageModel);
    }
}