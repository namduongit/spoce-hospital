package com.appointmenthostpital.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.ExportTicketConvert;
import com.appointmenthostpital.server.dtos.admin.AdminExportTicketDTO;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.ExportTicketItemModel;
import com.appointmenthostpital.server.models.ExportTicketModel;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.repositories.ExportTicketRepository;
import com.appointmenthostpital.server.responses.ExportTicketResponse;

import jakarta.transaction.Transactional;

@Service
public class ExportTicketService {
    @Autowired
    private ExportTicketRepository exportTicketRepository;
    
    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UserService userService;

    public ExportTicketModel getExportTicketById(Long id) {
        return this.exportTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu xuất không tồn tại"));
    }

    public List<ExportTicketResponse> handleGetExportTicketList() {
        List<ExportTicketModel> tickets = this.exportTicketRepository.findAll();
        return tickets.stream().map(ExportTicketConvert::convertToResponse).toList();
    }

    public ExportTicketResponse handleCreateExportTicket(Authentication authentication, AdminExportTicketDTO.CreateExportTicketRequest request) {
        ExportTicketModel ticket = new ExportTicketModel();
        AccountModel accountModel = this.userService.getUserByEmail(authentication.getName());
        ticket.setPerformedBy(accountModel);
        ExportTicketConvert.convertFromCreateRequest(ticket, request);

        List<ExportTicketItemModel> items = request.getItems().stream().map(itemRequest -> {
            ExportTicketItemModel item = new ExportTicketItemModel();
            MedicineModel medicine = medicineService.getMedicineById(itemRequest.getMedicineId());
            item.setMedicine(medicine);
            item.setQuantity(itemRequest.getQuantity());
            item.setExportTicket(ticket);
            return item;
        }).collect(Collectors.toList());
        
        ticket.setItems(items);
        ExportTicketModel savedTicket = this.exportTicketRepository.save(ticket);
        return ExportTicketConvert.convertToResponse(savedTicket);
    }

    @Transactional
    public ExportTicketResponse handleChangeExportTicketStatus(Long id, AdminExportTicketDTO.ChangeExportTicketStatusRequest request) {
        ExportTicketModel ticket = this.getExportTicketById(id);
        String oldStatus = ticket.getStatus();
        String newStatus = request.getStatus();
        
        ticket.setStatus(newStatus);
        ticket = this.exportTicketRepository.save(ticket);
        
        if ("COMPLETED".equals(newStatus) && !"COMPLETED".equals(oldStatus)) {
            updateInventoryFromExportTicket(ticket);
        }
        
        return ExportTicketConvert.convertToResponse(ticket);
    }

    private void updateInventoryFromExportTicket(ExportTicketModel ticket) {
        if (ticket.getItems() == null || ticket.getItems().isEmpty()) {
            return;
        }
        
        for (ExportTicketItemModel item : ticket.getItems()) {
            try {
                medicineService.updateMedicineStock(item.getMedicine().getId(), -item.getQuantity());
            } catch (Exception e) {
                System.err.println("Lỗi khi cập nhật tồn kho cho thuốc ID " + 
                    item.getMedicine().getId() + ": " + e.getMessage());
            }
        }
    }
}
