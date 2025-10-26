package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appointmenthostpital.server.converts.ImportTicketConvert;
import com.appointmenthostpital.server.dtos.admin.AdminImportTicketDTO;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.ImportTicketItemModel;
import com.appointmenthostpital.server.models.ImportTicketModel;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.repositories.ImportTicketRepository;
import com.appointmenthostpital.server.responses.ImportTicketResponse;

@Service
public class ImportTicketService {
    @Autowired
    private ImportTicketRepository importTicketRepository;
    
    @Autowired
    private MedicineService medicineService;

    @Autowired 
    private AccountService accountService;

    public ImportTicketModel getImportTicketById(Long id) {
        return this.importTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu nhập không tồn tại"));
    }

    public List<ImportTicketResponse> handleGetImportTicketList() {
        List<ImportTicketModel> tickets = this.importTicketRepository.findAll();
        return tickets.stream().map(ImportTicketConvert::convertToResponse).toList();
    }

    public ImportTicketResponse handleCreateImportTicket(Authentication authentication ,AdminImportTicketDTO.CreateImportTicketRequest request) {
        ImportTicketModel importTicketModel = new ImportTicketModel();
        AccountModel accountModel = this.accountService.getUserByEmail(authentication.getName());
        importTicketModel.setPerformedBy(accountModel);
        ImportTicketConvert.convertFromCreateRequest(importTicketModel, request);
        
        List<ImportTicketItemModel> items = request.getItems().stream().map(item -> {
            ImportTicketItemModel ticketItemModel = new ImportTicketItemModel();
            MedicineModel medicine = this.medicineService.getMedicineById(item.getMedicineId());
            ticketItemModel.setMedicine(medicine);
            ticketItemModel.setQuantity(item.getQuantity());
            ticketItemModel.setUnitPrice(item.getUnitPrice());
            ticketItemModel.setExpiryDate(item.getExpiryDate());
            ticketItemModel.setImportTicket(importTicketModel);
            return ticketItemModel;
        }).toList();
        
        importTicketModel.setItems(items);
        importTicketModel.setTotalAmount(items.stream().mapToLong(
            item -> item.getUnitPrice() * item.getQuantity()
        ).sum());
        return ImportTicketConvert.convertToResponse(this.importTicketRepository.save(importTicketModel));
    }

    /** Change Status -> COMPLETED OR CANCELLED */
    @Transactional
    public ImportTicketResponse handleChangeImportTicketStatus(Long id, AdminImportTicketDTO.ChangeImportTicketStatusRequest request) {
        ImportTicketModel importTicketModel = this.getImportTicketById(id);
        if (importTicketModel.getStatus().equals("COMPLETED") || importTicketModel.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Không thể thay đổi trạng thái của phiếu nhập đã hoàn thành hoặc hủy");
        }
        
        importTicketModel.setStatus(request.getStatus());
        importTicketModel = this.importTicketRepository.save(importTicketModel);
        
        if (importTicketModel.getStatus().equals("COMPLETED")) {
            updateInventoryFromImportTicket(importTicketModel);
        }
        
        return ImportTicketConvert.convertToResponse(importTicketModel);
    }
    
    private void updateInventoryFromImportTicket(ImportTicketModel ticket) {        
        for (ImportTicketItemModel item : ticket.getItems()) {
            try {
                this.medicineService.updateMedicineStock(item.getMedicine().getId(), item.getQuantity());
            } catch (Exception e) {
                throw new RuntimeException("Cập nhật tồn kho thất bại cho thuốc: " + item.getMedicine().getName());
            }
        }
    }
}
