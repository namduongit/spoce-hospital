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
import com.appointmenthostpital.server.dtos.doctor.DoctorServiceInvoiceDTO;
import com.appointmenthostpital.server.responses.ServiceInvoiceResponse;
import com.appointmenthostpital.server.services.ServiceInvoiceService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/service-invoices")
public class ServiceInvoiceController {
    @Autowired
    private ServiceInvoiceService serviceInvoiceService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<ServiceInvoiceResponse>>> handleGetServiceInvoiceList() {
        List<ServiceInvoiceResponse> responses = serviceInvoiceService.handleGetServiceInvoiceList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<ServiceInvoiceResponse>>(
                HttpStatusResponse.OK, true, responses, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<ServiceInvoiceResponse>> handleCreateServiceInvoice(
            Authentication authentication, 
            @Valid @RequestBody DoctorServiceInvoiceDTO.CreateServiceInvoiceRequest request) {
        ServiceInvoiceResponse response = serviceInvoiceService
                .handleCreateServiceInvoice(authentication, request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<ServiceInvoiceResponse>(
                HttpStatusResponse.CREATED, true, response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RestResponse<ServiceInvoiceResponse>> handleUpdateServiceInvoiceStatus(
            @PathVariable(name = "id", required = true) Long id,
            @Valid @RequestBody DoctorServiceInvoiceDTO.ChangeServiceInvoiceStatusRequest request) {
        ServiceInvoiceResponse response = serviceInvoiceService.handleUpdateServiceInvoiceStatus(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<ServiceInvoiceResponse>(
                HttpStatusResponse.OK, true, response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }
}
