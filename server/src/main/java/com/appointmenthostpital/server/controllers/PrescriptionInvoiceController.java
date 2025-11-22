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
import com.appointmenthostpital.server.dtos.doctor.DoctorPrescriptionInvoiceDTO;
import com.appointmenthostpital.server.responses.PrescriptionInvoiceResponse;
import com.appointmenthostpital.server.services.PrescriptionInvoiceService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/prescription-invoices")
public class PrescriptionInvoiceController {
    @Autowired
    private PrescriptionInvoiceService prescriptionInvoiceService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<PrescriptionInvoiceResponse>>> handleGetPrescriptionInvoiceList() {
        List<PrescriptionInvoiceResponse> responses = prescriptionInvoiceService.handleGetPrescriptionInvoiceList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<PrescriptionInvoiceResponse>>(
                HttpStatusResponse.OK, true, responses, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<PrescriptionInvoiceResponse>> handleCreatePrescriptionInvoice(
            Authentication authentication, 
            @Valid @RequestBody DoctorPrescriptionInvoiceDTO.CreatePrescriptionInvoiceRequest request) {
        PrescriptionInvoiceResponse response = prescriptionInvoiceService
                .handleCreatePrescriptionInvoice(authentication, request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<PrescriptionInvoiceResponse>(
                HttpStatusResponse.CREATED, true, response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestResponse<PrescriptionInvoiceResponse>> handleGetPrescriptionInvoiceById(
            @PathVariable(name = "id", required = true) Long id) {
        PrescriptionInvoiceResponse response = prescriptionInvoiceService.handleGetPrescriptionInvoiceById(id);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<PrescriptionInvoiceResponse>(
                HttpStatusResponse.OK, true, response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RestResponse<PrescriptionInvoiceResponse>> handleUpdatePrescriptionInvoiceStatus(
            @PathVariable(name = "id", required = true) Long id,
            @Valid @RequestBody DoctorPrescriptionInvoiceDTO.ChangePrescriptionInvoiceStatusRequest request) {
        PrescriptionInvoiceResponse response = prescriptionInvoiceService.handleUpdatePrescriptionInvoiceStatus(id, request);
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<PrescriptionInvoiceResponse>(
                HttpStatusResponse.OK, true, response, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }
}
