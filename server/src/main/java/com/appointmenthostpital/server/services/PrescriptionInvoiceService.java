package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appointmenthostpital.server.converts.PrescriptionInvoiceConvert;
import com.appointmenthostpital.server.dtos.doctor.DoctorPrescriptionInvoiceDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceDetailModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.repositories.PrescriptionInvoiceRepository;
import com.appointmenthostpital.server.responses.PrescriptionInvoiceResponse;

@Service
public class PrescriptionInvoiceService {
    @Autowired
    private PrescriptionInvoiceRepository prescriptionInvoiceRepository;

    @Autowired 
    private AccountService accountService;

    @Autowired 
    private MedicineService medicineService;

    public PrescriptionInvoiceModel getPrescriptionInvoiceById(Long id) {
        return prescriptionInvoiceRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy hóa đơn kê thuốc"));
    }

    public PrescriptionInvoiceResponse handleGetPrescriptionInvoiceById(Long id) {
        PrescriptionInvoiceModel invoiceModel = this.getPrescriptionInvoiceById(id);
        return PrescriptionInvoiceConvert.convertToResponse(invoiceModel);
    }

    public List<PrescriptionInvoiceResponse> handleGetPrescriptionInvoiceList() {
        return this.prescriptionInvoiceRepository.findAll().stream().map(
            PrescriptionInvoiceConvert::convertToResponse
        ).toList();
    }

    public void handleDetailPrescriptionInvoice(PrescriptionInvoiceModel invoiceModel,
    DoctorPrescriptionInvoiceDTO.CreatePrescriptionInvoiceRequest request) {
        List<PrescriptionInvoiceDetailModel> details = request.getMedicines().stream().map(medicine -> {
            PrescriptionInvoiceDetailModel detailModel = new PrescriptionInvoiceDetailModel();
            MedicineModel medicineModel = this.medicineService.getMedicineById(medicine.getMedicineId());
            detailModel.setMedicineModel(medicineModel);
            detailModel.setPrescriptionInvoiceModel(invoiceModel);
            detailModel.setQuantity(medicine.getQuantity());
            detailModel.setDosage(medicine.getDosage());
            detailModel.setUsageInstructions(medicine.getUsageInstructions());
            return detailModel;
        }).toList();
        invoiceModel.setPrescriptionInvoiceDetails(details);
        invoiceModel.setTotalAmount(details.stream().mapToLong(
            detail -> detail.getMedicineModel().getPrice() * detail.getQuantity()
        ).sum());
    }

    
    public PrescriptionInvoiceResponse handleCreatePrescriptionInvoice(Authentication authentication,
    DoctorPrescriptionInvoiceDTO.CreatePrescriptionInvoiceRequest request) {
        PrescriptionInvoiceModel invoiceModel = new PrescriptionInvoiceModel();
        invoiceModel.setDoctorAccountModel(this.accountService.getUserByEmail(authentication.getName()));
        if (request.getUserId() != null) {
            invoiceModel.setPatientAccountModel(accountService.getUserById(request.getUserId()));
        }
        PrescriptionInvoiceConvert.convertFromCreateRequest(invoiceModel, request);

        List<PrescriptionInvoiceDetailModel> details = request.getMedicines().stream().map(medicine -> {
            PrescriptionInvoiceDetailModel detailModel = new PrescriptionInvoiceDetailModel();
            MedicineModel medicineModel = this.medicineService.getMedicineById(medicine.getMedicineId());
            detailModel.setMedicineModel(medicineModel);
            detailModel.setPrescriptionInvoiceModel(invoiceModel);
            
            detailModel.setQuantity(medicine.getQuantity());
            detailModel.setDosage(medicine.getDosage().isEmpty() ? "Không có liều dùng" : medicine.getDosage());
            detailModel.setUsageInstructions(medicine.getUsageInstructions().isEmpty() ? "Không có hướng dẫn" : medicine.getUsageInstructions());
            return detailModel;
        }).toList();

        invoiceModel.setPrescriptionInvoiceDetails(details);
        invoiceModel.setTotalAmount(details.stream().mapToLong(
            detail -> detail.getMedicineModel().getPrice() * detail.getQuantity()
        ).sum());
        return PrescriptionInvoiceConvert.convertToResponse(this.prescriptionInvoiceRepository.save(invoiceModel));
    }

    /** Change Status -> PAID or CANCELLED */
    @Transactional
    public PrescriptionInvoiceResponse handleUpdatePrescriptionInvoiceStatus(
        Long id,
    DoctorPrescriptionInvoiceDTO.ChangePrescriptionInvoiceStatusRequest request) {
        PrescriptionInvoiceModel invoiceModel = this.getPrescriptionInvoiceById(id);
        if (invoiceModel.getStatus().equals("PAID") || invoiceModel.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Không thể thay đổi trạng thái của hóa đơn đã thanh toán hoặc hủy");
        }
        
        invoiceModel.setStatus(request.getStatus());
        invoiceModel = this.prescriptionInvoiceRepository.save(invoiceModel);

        if (invoiceModel.getStatus().equals("PAID")) {
            this.updateInventoryFromPrescriptionInvoice(invoiceModel);
        }

        return PrescriptionInvoiceConvert.convertToResponse(invoiceModel);
    }

    @Transactional
    public PrescriptionInvoiceResponse handleChangePrescriptionInvoiceState(
        PrescriptionInvoiceModel invoice) {

        invoice = this.prescriptionInvoiceRepository.save(invoice);

        if (invoice.getStatus().equals("PAID")) {
            this.updateInventoryFromPrescriptionInvoice(invoice);
        }

        return PrescriptionInvoiceConvert.convertToResponse(invoice);
    }

    public boolean checkMedicineStockForPrescriptionInvoice(PrescriptionInvoiceModel invoice) {
        for (PrescriptionInvoiceDetailModel detail: invoice.getPrescriptionInvoiceDetails()) {
            if (detail.getMedicineModel().getCurrentStock() < detail.getQuantity()) {
                return false;
            }
        }
        return true;
    }

    public void updateInventoryFromPrescriptionInvoice(PrescriptionInvoiceModel invoice) {
        for (PrescriptionInvoiceDetailModel detail : invoice.getPrescriptionInvoiceDetails()) {
            try {
                this.medicineService.updateMedicineStock(detail.getMedicineModel().getId(), -detail.getQuantity());
            } catch (Exception e) {
                throw new RuntimeException("Cập nhật tồn kho thất bại cho thuốc: " + detail.getMedicineModel().getName());
            }
            
        }
    }
    
}
