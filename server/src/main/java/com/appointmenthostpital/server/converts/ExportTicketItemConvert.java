package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.ExportTicketItemModel;
import com.appointmenthostpital.server.responses.ExportTicketItemResponse;

public class ExportTicketItemConvert {
    public static ExportTicketItemResponse convertToResponse(ExportTicketItemModel model) {
        ExportTicketItemResponse response = new ExportTicketItemResponse();
        response.setId(model.getId());
        response.setMedicineId(model.getMedicine().getId());
        response.setMedicineName(model.getMedicine().getName());
        response.setQuantity(model.getQuantity());
        return response;
    }
}

