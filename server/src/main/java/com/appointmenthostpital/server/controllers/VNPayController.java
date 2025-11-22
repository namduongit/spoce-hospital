package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.vnpay.VNPayCheck;
import com.appointmenthostpital.server.dtos.vnpay.VNPayResponse;
import com.appointmenthostpital.server.services.VNPayService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payment/vnpay")
public class VNPayController {
    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/service-invoice/payment-url")
    public ResponseEntity<RestResponse<VNPayResponse.Payment>> getPaymentUrlServiceInvoice(
        @Valid @RequestBody PaymentSend order, 
        HttpServletRequest request, @RequestHeader("X-Request-Path") String requestFrom) {
        String paymentUrl = vnPayService.getPaymentUrl(order, request);

        VNPayResponse.Payment vnPayResponse = new VNPayResponse.Payment();
        vnPayResponse.setPaymentUrl(paymentUrl);
        vnPayResponse.setRequestFrom(requestFrom);

        RestResponse<VNPayResponse.Payment> response = new RestResponse<>();
        response.setResult(true);
        response.setStatusCode(HttpStatusResponse.OK);
        response.setData(vnPayResponse);
        response.setMessage(HttpStatusResponse.SUCCESS_MESSAGE);
        response.setErrorMessage(null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }

    @PostMapping("/prescription-invoice/payment-url")
    public ResponseEntity<RestResponse<VNPayResponse.Payment>> getPaymentUrlPrescriptionInvoice(
        @RequestBody PaymentSend order, 
        HttpServletRequest request, @RequestHeader("X-Request-Path") String requestFrom) {
        String paymentUrl = vnPayService.getPaymentUrl(order, request);

        VNPayResponse.Payment vnPayResponse = new VNPayResponse.Payment();
        vnPayResponse.setPaymentUrl(paymentUrl);
        vnPayResponse.setRequestFrom(requestFrom);

        RestResponse<VNPayResponse.Payment> response = new RestResponse<>();
        response.setResult(true);
        response.setStatusCode(HttpStatusResponse.OK);
        response.setData(vnPayResponse);
        response.setMessage(HttpStatusResponse.SUCCESS_MESSAGE);
        response.setErrorMessage(null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }

    @PostMapping("/valid/check-payment")
    public ResponseEntity<RestResponse<VNPayResponse.CheckPayment>> checkPaymentPrescriptionInvoice(
            @RequestBody @Valid VNPayCheck payCheck, Authentication authentication) {
        VNPayResponse.CheckPayment response = vnPayService.processPaymentCallback(payCheck, authentication);

        return ResponseEntity.status(HttpStatusResponse.OK)
                .body(new RestResponse<VNPayResponse.CheckPayment>(HttpStatusResponse.OK, true, response, 
                HttpStatusResponse.SUCCESS_MESSAGE, null));
    }
}