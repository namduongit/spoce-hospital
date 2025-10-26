package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminImportTicketDTO;
import com.appointmenthostpital.server.models.ImportTicketModel;
import com.appointmenthostpital.server.responses.ImportTicketResponse;

public class ImportTicketConvert {
    public static ImportTicketResponse convertToResponse(ImportTicketModel model) {
        ImportTicketResponse response = new ImportTicketResponse();
        response.setId(model.getId());
        response.setSupplierName(model.getSupplierName());
        response.setReason(model.getReason());
        response.setPerformedBy(model.getPerformedBy().getEmail());
        response.setStatus(model.getStatus());
        response.setItems(model.getItems().stream()
                .map(ImportTicketItemConvert::convertToResponse)
                .toList());
        response.setCreatedAt(model.getCreatedAt());
        response.setUpdatedAt(model.getUpdatedAt());    
        return response;
    } 

    public static void convertFromCreateRequest(ImportTicketModel model, AdminImportTicketDTO.CreateImportTicketRequest request) {
        model.setSupplierName(request.getSupplierName());
        model.setReason(request.getReason());
        model.setStatus("PENDING");
    }
}
