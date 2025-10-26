package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminImportTicketDTO;
import com.appointmenthostpital.server.responses.ImportTicketResponse;
import com.appointmenthostpital.server.services.ImportTicketService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/import-tickets")
public class ImportTicketController {
    @Autowired
    private ImportTicketService importTicketService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<ImportTicketResponse>>> handleGetImportTicketList() {
        List<ImportTicketResponse> response = this.importTicketService.handleGetImportTicketList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<ImportTicketResponse>>(
                HttpStatusResponse.OK, 
                true,
                response, 
                HttpStatusResponse.SUCCESS_MESSAGE, 
                null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<ImportTicketResponse>> handleCreateImportTicket( Authentication authentication,
            @Valid @RequestBody AdminImportTicketDTO.CreateImportTicketRequest request) {
        ImportTicketResponse response = this.importTicketService.handleCreateImportTicket(authentication, request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<ImportTicketResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RestResponse<ImportTicketResponse>> handleChangeImportTicketStatus(
            @PathVariable(name = "id", required = true) Long id,
            @Valid @RequestBody AdminImportTicketDTO.ChangeImportTicketStatusRequest request) {
        ImportTicketResponse response = this.importTicketService.handleChangeImportTicketStatus(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<ImportTicketResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}