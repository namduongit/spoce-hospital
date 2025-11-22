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
import com.appointmenthostpital.server.dtos.momo.MomoCheck;
import com.appointmenthostpital.server.dtos.momo.MomoResponse;
import com.appointmenthostpital.server.exceptions.MomoException;
import com.appointmenthostpital.server.services.MomoService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payment/momo")
public class MomoController {
    @Autowired
    private MomoService momoService;
    
    @PostMapping("/service-invoice/payment-url")
    public ResponseEntity<RestResponse<MomoResponse.Payment>> getPaymentUrlServiceInvoice(
        @Valid @RequestBody PaymentSend order,
        HttpServletRequest request, @RequestHeader("X-Request-Path") String requestFrom) {
        String paymentUrl;
        try {
            paymentUrl = this.momoService.getPaymentUrl(order);
        } catch (Exception e) {
            throw new MomoException(e.getMessage());
        }

        MomoResponse.Payment momoResponse = new MomoResponse.Payment();
        momoResponse.setPaymentUrl(paymentUrl);
        momoResponse.setRequestFrom(requestFrom);

       RestResponse<MomoResponse.Payment> response = new RestResponse<>();
        response.setResult(true);
        response.setStatusCode(HttpStatusResponse.OK);
        response.setData(momoResponse);
            response.setMessage(HttpStatusResponse.SUCCESS_MESSAGE);
            response.setErrorMessage(null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }

    @PostMapping("/prescription-invoice/payment-url")
    public ResponseEntity<RestResponse<MomoResponse.Payment>> getPaymentUrlPrescriptionInvoice(
        @RequestBody PaymentSend order, 
        HttpServletRequest request, @RequestHeader("X-Request-Path") String requestFrom) {
        String paymentUrl;
        try {
            paymentUrl = this.momoService.getPaymentUrl(order);
        } catch (Exception e) {
            throw new MomoException(e.getMessage());
        }

        MomoResponse.Payment momoResponse = new MomoResponse.Payment();
        momoResponse.setPaymentUrl(paymentUrl);
        momoResponse.setRequestFrom(requestFrom);

        RestResponse<MomoResponse.Payment> response = new RestResponse<>();
        response.setResult(true);
        response.setStatusCode(HttpStatusResponse.OK);
        response.setData(momoResponse);
        response.setMessage(HttpStatusResponse.SUCCESS_MESSAGE);
        response.setErrorMessage(null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }

    @PostMapping("/valid/check-payment")
    public ResponseEntity<RestResponse<MomoResponse.CheckPayment>> checkPaymentPrescriptionInvoice(
            @RequestBody @Valid MomoCheck payCheck, Authentication authentication) {
        MomoResponse.CheckPayment response = this.momoService.processPaymentCallback(payCheck, authentication);
        System.out.println("Response Momo: " + response);

        return ResponseEntity.status(HttpStatusResponse.OK)
                .body(new RestResponse<MomoResponse.CheckPayment>(HttpStatusResponse.OK, true, response,
                HttpStatusResponse.SUCCESS_MESSAGE, null));
    }
}
