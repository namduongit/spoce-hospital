package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appointmenthostpital.server.converts.MedicineConvert;
import com.appointmenthostpital.server.dtos.admin.AdminMedicineDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.repositories.MedicineRepository;
import com.appointmenthostpital.server.responses.MedicineResponse;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;
    
    @Autowired
    private MedicineCategoryService medicineCategoryService;

    public MedicineModel getMedicineById(Long id) {
        return medicineRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy thuốc"));
    }

    public List<MedicineResponse> handleGetMedicineList() {
        List<MedicineModel> models = medicineRepository.findAll();
        return models.stream().map(MedicineConvert::convertToResponse).toList();
    }

    public MedicineResponse handleCreateMedicine(AdminMedicineDTO.CreateMedicineRequest request) {
        MedicineModel modelInventoryModel = new MedicineModel();
        modelInventoryModel.setCategoryModel(medicineCategoryService.getCategoryById(request.getCategoryId()));
        MedicineConvert.convertFromCreateRequest(modelInventoryModel, request);

        modelInventoryModel = this.medicineRepository.save(modelInventoryModel);
        return MedicineConvert.convertToResponse(modelInventoryModel);
    }

    public MedicineResponse handleUpdateMedicine(Long id, AdminMedicineDTO.UpdateMedicineRequest request) {
        MedicineModel medicine = this.getMedicineById(id);
        medicine.setCategoryModel(medicineCategoryService.getCategoryById(request.getCategoryId()));
        
        MedicineConvert.convertFromUpdateRequest(medicine, request);
        medicine = this.medicineRepository.save(medicine);
        return MedicineConvert.convertToResponse(medicine);
    }

    @Transactional
    public void updateMedicineStock(Long medicineId, Integer quantity) {
        MedicineModel medicine = this.getMedicineById(medicineId);
        Integer newStock = medicine.getCurrentStock() + quantity;
        
        if (newStock < 0) {
            throw new RuntimeException("Số lượng tồn kho không thể âm. Thuốc: " + medicine.getName());
        }
        
        medicine.setCurrentStock(newStock);
        
        if (newStock == 0) {
            medicine.setStatus("OUT_OF_STOCK");
        } else if (newStock > 0 && "OUT_OF_STOCK".equals(medicine.getStatus())) {
            medicine.setStatus("ACTIVE");
        }
        
        this.medicineRepository.save(medicine);
    }
}
