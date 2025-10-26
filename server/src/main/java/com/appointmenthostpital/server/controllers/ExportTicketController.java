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
import com.appointmenthostpital.server.dtos.admin.AdminExportTicketDTO;
import com.appointmenthostpital.server.responses.ExportTicketResponse;
import com.appointmenthostpital.server.services.ExportTicketService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/export-tickets")
public class ExportTicketController {
    @Autowired
    private ExportTicketService exportTicketService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<ExportTicketResponse>>> handleGetExportTicketList() {
        List<ExportTicketResponse> response = this.exportTicketService.handleGetExportTicketList();
        return ResponseEntity.ok().body(new RestResponse<List<ExportTicketResponse>>(
                HttpStatusResponse.OK, 
                true,
                response, 
                HttpStatusResponse.SUCCESS_MESSAGE, 
                null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<ExportTicketResponse>> handleCreateExportTicket(
            Authentication authentication,
            @Valid @RequestBody AdminExportTicketDTO.CreateExportTicketRequest request) {
        ExportTicketResponse response = this.exportTicketService.handleCreateExportTicket(authentication, request);
        return ResponseEntity.ok().body(new RestResponse<ExportTicketResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RestResponse<ExportTicketResponse>> handleChangeExportTicketStatus(
        @PathVariable(name = "id", required = true) Long id,
            @Valid @RequestBody AdminExportTicketDTO.ChangeExportTicketStatusRequest request) {
        ExportTicketResponse response = this.exportTicketService.handleChangeExportTicketStatus(id, request);
        return ResponseEntity.ok().body(new RestResponse<ExportTicketResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

}
