package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.services.InvoiceService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payment/cash")
public class PaymentInvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/payment")
    public ResponseEntity<RestResponse<Object>> handlePaymentSuccess(
            @Valid @RequestBody PaymentSend order, Authentication authentication) {
        InvoiceService.InvoicePayment objectResponse = invoiceService.handlePaymentSuccess(order, authentication);
        RestResponse<Object> response = new RestResponse<>();
        response.setResult(true);
        response.setStatusCode(HttpStatusResponse.OK);
        response.setData(objectResponse);
        response.setMessage(HttpStatusResponse.SUCCESS_MESSAGE);
        response.setErrorMessage(null);
        return ResponseEntity.ok(response);
    }
}
