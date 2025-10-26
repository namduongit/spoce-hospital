package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminExportTicketDTO;
import com.appointmenthostpital.server.models.ExportTicketModel;
import com.appointmenthostpital.server.responses.ExportTicketResponse;

public class ExportTicketConvert {
    public static ExportTicketResponse convertToResponse(ExportTicketModel model) {
        ExportTicketResponse response = new ExportTicketResponse();
        response.setId(model.getId());
        response.setReason(model.getReason());
        response.setPerformedBy(model.getPerformedBy().getEmail());
        response.setStatus(model.getStatus());
        response.setItems(model.getItems().stream()
                .map(ExportTicketItemConvert::convertToResponse)
                .toList());
        response.setCreatedAt(model.getCreatedAt());
        response.setUpdatedAt(model.getUpdatedAt());
        return response;
    }

    public static void convertFromCreateRequest(ExportTicketModel model, AdminExportTicketDTO.CreateExportTicketRequest request) {
        model.setReason(request.getReason());
        model.setStatus("PENDING");
    }
}
