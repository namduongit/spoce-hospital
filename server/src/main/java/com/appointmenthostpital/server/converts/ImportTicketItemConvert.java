package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.ImportTicketItemModel;
import com.appointmenthostpital.server.responses.ImportTicketItemResponse;

public class ImportTicketItemConvert {
    public static ImportTicketItemResponse convertToResponse(ImportTicketItemModel model) {
        ImportTicketItemResponse response = new ImportTicketItemResponse();
        response.setId(model.getId());
        response.setMedicineId(model.getMedicine().getId());
        response.setMedicineName(model.getMedicine().getName());
        response.setQuantity(model.getQuantity());
        response.setUnitPrice(model.getUnitPrice());
        response.setExpiryDate(model.getExpiryDate());
        return response;
    }
}
