package com.appointmenthostpital.server.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.configs.MomoConfig;
import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.dtos.momo.MomoCheck;
import com.appointmenthostpital.server.dtos.momo.MomoResponse;
import com.appointmenthostpital.server.exceptions.MomoException;
import com.appointmenthostpital.server.exceptions.VNPayException;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;
import com.appointmenthostpital.server.utils.MomoUtil;

@Service
public class MomoService extends MomoConfig {

    @Autowired
    private ServiceInvoiceService serviceInvoiceService;

    @Autowired
    private PrescriptionInvoiceService prescriptionInvoiceService;

    @Autowired
    private AccountService accountService;

    public String getPaymentUrl(PaymentSend order) throws Exception {

        String orderId = UUID.randomUUID().toString();
        String requestId = UUID.randomUUID().toString();

        Long totalAmount = 0L;
        String orderRequestType = order.getOrderType();
        ServiceInvoiceModel serviceInvoice = serviceInvoiceService.getServiceInvoiceById(order.getOrderId());
        if (orderRequestType.equals("SERVICE INVOICE")) {

            totalAmount = serviceInvoice.getTotalAmount();

        } else if (orderRequestType.equals("PRESCRIPTION INVOICE")) {
            PrescriptionInvoiceModel prescriptionInvoice = prescriptionInvoiceService
                    .getPrescriptionInvoiceById(order.getOrderId());
            if (!prescriptionInvoiceService.checkMedicineStockForPrescriptionInvoice(prescriptionInvoice)) {
                throw new VNPayException("Không đủ tồn kho để thanh toán hóa đơn");
            }
            totalAmount = prescriptionInvoice.getTotalAmount();
        } else {
            throw new IllegalArgumentException("Lỗi tạo hóa đơn do sai loại");
        }
        String orderInfo = "HD " + orderRequestType + " " + order.getOrderId();
        JSONObject json = new JSONObject();
        json.put("partnerCode", this.getPartnerCode());
        json.put("orderId", orderId);
        json.put("requestId", requestId);
        json.put("amount", totalAmount);
        json.put("orderInfo", orderInfo);
        json.put("redirectUrl", this.getReturnUrl());
        json.put("ipnUrl", this.getIpnUrl());
        json.put("requestType", "captureWallet");
        json.put("extraData", "");

        String hashData = "accessKey=" + this.getAccessKey() +
                "&amount=" + totalAmount +
                "&extraData=" +
                "&ipnUrl=" + this.getIpnUrl() +
                "&orderId=" + orderId +
                "&orderInfo=" + orderInfo +
                "&partnerCode=" + this.getPartnerCode() +
                "&redirectUrl=" + this.getReturnUrl() +
                "&requestId=" + requestId +
                "&requestType=captureWallet";

        String signature = MomoUtil.hmacSHA256(hashData, this.getSecretKey());
        json.put("signature", signature);

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(this.getUrlPayment()))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject result = new JSONObject(response.body());

        if (result.has("payUrl")) {
            return result.getString("payUrl");
        }

        throw new MomoException("MoMo error: " + response.body());
    }

    /**
     * Validate Momo payment callback
     * 
     * @param payCheck - Payment data from Momo callback
     * @return true if valid, false otherwise
     */

    public boolean validatePaymentCallBack(MomoCheck payCheck) {
        try {
            String hashData = "accessKey=" + this.getAccessKey() +
                    "&amount=" + payCheck.getAmount() +
                    "&extraData=" + (payCheck.getExtraData() != null ? payCheck.getExtraData() : "") +
                    "&message=" + payCheck.getMessage() +
                    "&orderId=" + payCheck.getOrderId() +
                    "&orderInfo=" + payCheck.getOrderInfo() +
                    "&orderType=" + payCheck.getOrderType() +
                    "&partnerCode=" + payCheck.getPartnerCode() +
                    "&payType=" + payCheck.getPayType() +
                    "&requestId=" + payCheck.getRequestId() +
                    "&responseTime=" + payCheck.getResponseTime() +
                    "&resultCode=" + payCheck.getResultCode() +
                    "&transId=" + payCheck.getTransId();

            String signature = MomoUtil.hmacSHA256(hashData, this.getSecretKey());

            return signature.equals(payCheck.getSignature());
        } catch (Exception e) {
            e.printStackTrace(); // Log để debug
            return false;
        }
    }

    /**
     * Process payment callback and update invoice status
     * 
     * @param payCheck - Payment data from Momo callback
     * @return CheckPayment response (isPaid, directUrl)
     */
    public MomoResponse.CheckPayment processPaymentCallback(MomoCheck payCheck, Authentication authentication) {
        MomoResponse.CheckPayment response = new MomoResponse.CheckPayment();

        if (!validatePaymentCallBack(payCheck)) {
            throw new MomoException("Chữ ký không hợp lệ");
        }
        if (!payCheck.getPartnerCode().equals(this.getPartnerCode())) {
            throw new MomoException("Mã Partner không hợp lệ");
        }
        if (!"0".equals(payCheck.getResultCode())) {
            throw new MomoException("Giao dịch không thành công");
        }

        // Extract order info: "HD SERVICE INVOICE 123" or "HD PRESCRIPTION INVOICE 456"
        String orderInfo = payCheck.getOrderInfo();
        String[] parts = orderInfo.split(" ");

        if (parts.length < 4) {
            throw new MomoException("Thông tin đơn hàng không hợp lệ");
        }

        // "SERVICE INVOICE" or "PRESCRIPTION INVOICE"
        String orderType = parts[1] + " " + parts[2];
        Long orderId = Long.parseLong(parts[3]);

        Long receivedAmount = payCheck.getAmount();

        if ("SERVICE INVOICE".equals(orderType)) {
            ServiceInvoiceModel invoice = serviceInvoiceService.getServiceInvoiceById(orderId);
            if (!invoice.getTotalAmount().equals(receivedAmount)) {
                throw new MomoException("Số tiền không khớp");
            }
            if (!invoice.getStatus().equals("PENDING")) {
                throw new MomoException("Hóa đơn đã được thanh toán hoặc hủy");
            }

            invoice.setMomoRef(payCheck.getRequestId());
            invoice.setStatus("PAID");
            this.serviceInvoiceService.save(invoice);

        } else if ("PRESCRIPTION INVOICE".equals(orderType)) {
            PrescriptionInvoiceModel invoice = prescriptionInvoiceService.getPrescriptionInvoiceById(orderId);
            if (!invoice.getTotalAmount().equals(receivedAmount)) {
                throw new VNPayException("Số tiền không khớp");
            }
            if (!invoice.getStatus().equals("PENDING")) {
                throw new VNPayException("Hóa đơn đã được thanh toán hoặc hủy");
            }
            if (!prescriptionInvoiceService.checkMedicineStockForPrescriptionInvoice(invoice)) {
                throw new VNPayException("Không đủ tồn kho để thanh toán hóa đơn");
            }

            invoice.setMomoRef(payCheck.getRequestId());
            invoice.setStatus("PAID");
            this.prescriptionInvoiceService.handleChangePrescriptionInvoiceState(invoice);

        }

        response.setOrderId(orderId);
        response.setOrderType(orderType);
        response.setAmount(receivedAmount);
        response.setDirectUrl(this.getDirectUrl(authentication, orderType));
        response.setPaid(true);

        return response;
    }

    public String getDirectUrl(Authentication authentication, String orderType) {
        if (authentication == null) return "/";

        String email = authentication.getName();
        AccountModel accountModel = accountService.getUserByEmail(email);

        return accountModel.getRole().equals("ADMIN") ? "/admin" + "/" + orderType.toLowerCase().replace(" ", "-")
                : accountModel.getRole().equals("ASSISTOR")
                        ? "/assistor" + "/" + orderType.toLowerCase().replace(" ", "-")
                        : "/";
    }

}
