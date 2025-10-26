package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.doctor.DoctorServiceInvoiceDTO;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;
import com.appointmenthostpital.server.responses.ServiceInvoiceResponse;

public class ServiceInvoiceConvert {
    public static ServiceInvoiceResponse convertToResponse(ServiceInvoiceModel model) {
        ServiceInvoiceResponse response = new ServiceInvoiceResponse();
        response.setId(model.getId());
        response.setPatientName(model.getPatientName());
        response.setPatientPhone(model.getPatientPhone());
        response.setTotalAmount(model.getTotalAmount());
        response.setStatus(model.getStatus());

        response.setCreateAt(model.getCreatedAt().toString());
        response.setUpdateAt(model.getUpdatedAt().toString());

        if (model.getPatientAccountModel() != null) {
            response.setPatientId(model.getPatientAccountModel().getId());
            response.setPatientEmail(model.getPatientAccountModel().getEmail());
        }
        
        response.setMedicalPackages(model.getServiceInvoiceDetails().stream().map(detail -> {
            ServiceInvoiceResponse.ServiceItem item = new ServiceInvoiceResponse.ServiceItem();
            item.setMedicalPackageId(detail.getMedicalPackageModel().getId());
            item.setMedicalPackageName(detail.getMedicalPackageModel().getName());
            item.setPrice(detail.getMedicalPackageModel().getPrice());

            return item;
        }).toList());

        response.setDoctorId(model.getDoctorAccountModel().getId());
        response.setDoctorEmail(model.getDoctorAccountModel().getEmail());

        return response;
    }

    public static void convertFromCreateRequest(ServiceInvoiceModel model, DoctorServiceInvoiceDTO.CreateServiceInvoiceRequest request) {
        model.setPatientName(request.getPatientName().isEmpty() ? "Không có tên" : request.getPatientName());
        model.setPatientPhone(request.getPatientPhone().isEmpty() ? "Không có số điện thoại" : request.getPatientPhone());
        model.setStatus("PENDING");
    }
}
