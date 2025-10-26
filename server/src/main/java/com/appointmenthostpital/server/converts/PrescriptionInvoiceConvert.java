package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.doctor.DoctorPrescriptionInvoiceDTO;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.responses.PrescriptionInvoiceResponse;
import com.appointmenthostpital.server.responses.PrescriptionInvoiceResponse.PrescriptionItem;

public class PrescriptionInvoiceConvert {
    public static PrescriptionInvoiceResponse convertToResponse(PrescriptionInvoiceModel model) {
        PrescriptionInvoiceResponse response = new PrescriptionInvoiceResponse();
        response.setId(model.getId());
        response.setPatientName(model.getPatientName());
        response.setPatientPhone(model.getPatientPhone());
        response.setSymptoms(model.getSymptoms());
        response.setNote(model.getNote());
        response.setTotalAmount(model.getTotalAmount());
        response.setStatus(model.getStatus());

        response.setCreateAt(model.getCreatedAt().toString());
        response.setUpdateAt(model.getUpdatedAt().toString());

        if (model.getPatientAccountModel() != null) {
            response.setPatientId(model.getPatientAccountModel().getId());
            response.setPatientEmail(model.getPatientAccountModel().getEmail());
        }

        response.setMedicines(model.getPrescriptionInvoiceDetails().stream().map(detail -> {
            PrescriptionItem item = new PrescriptionItem();
            item.setMedicineId(detail.getMedicineModel().getId());
            item.setMedicineName(detail.getMedicineModel().getName());
            item.setQuantity(detail.getQuantity());
            item.setUnitPrice(detail.getMedicineModel().getPrice());
            item.setTotalPrice(detail.getMedicineModel().getPrice() * detail.getQuantity());
            item.setDosage(detail.getDosage());
            item.setUsageInstructions(detail.getUsageInstructions());

            return item;
        }).toList());

        response.setDoctorId(model.getDoctorAccountModel().getId());
        response.setDoctorEmail(model.getDoctorAccountModel().getEmail());
        return response;
    }

    public static void convertFromCreateRequest(PrescriptionInvoiceModel model, DoctorPrescriptionInvoiceDTO.CreatePrescriptionInvoiceRequest request) {
        model.setPatientName(request.getPatientName().isEmpty() ? "Không có tên" : request.getPatientName());
        model.setPatientPhone(request.getPatientPhone().isEmpty() ? "Không có số điện thoại" : request.getPatientPhone());
        model.setSymptoms(request.getSymptoms().isEmpty() ? "Không có triệu chứng" : request.getSymptoms());
        model.setNote(request.getNote().isEmpty() ? "Không có ghi chú" : request.getNote());
        model.setStatus("PENDING");
    }
}
