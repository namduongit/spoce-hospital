package com.appointmenthostpital.server.services;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.configs.VNPayConfig;
import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.dtos.vnpay.VNPayCheck;
import com.appointmenthostpital.server.dtos.vnpay.VNPayResponse;
import com.appointmenthostpital.server.exceptions.VNPayException;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;
import com.appointmenthostpital.server.utils.VNPayUtil;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class VNPayService extends VNPayConfig {

    @Autowired
    private ServiceInvoiceService serviceInvoiceService;

    @Autowired
    private PrescriptionInvoiceService prescriptionInvoiceService;

    @Autowired
    private AccountService accountService;

    /**
     * String bankCode = req.getParameter("bankCode"); Optional
     * if (bankCode != null && !bankCode.isEmpty()) {
     * vnp_Params.put("vnp_BankCode", bankCode);
     * }
     * 
     * @param order
     * @param request
     * @return paymentUrl: String
     * 
     *         transactionReference: Unique order code in VNPay system
     */

    public String getPaymentUrl(PaymentSend order, HttpServletRequest request) {
        String version = "2.1.0";
        String command = "pay";
        String orderType = "other";
        
        Long totalAmount = 0L;
        String orderRequestType = order.getOrderType();
        if (orderRequestType.equals("SERVICE INVOICE")) {
            ServiceInvoiceModel serviceInvoice = serviceInvoiceService.getServiceInvoiceById(order.getOrderId());
            totalAmount = serviceInvoice.getTotalAmount() * 100L;

        } else if (orderRequestType.equals("PRESCRIPTION INVOICE")) {
            PrescriptionInvoiceModel prescriptionInvoice = prescriptionInvoiceService
                    .getPrescriptionInvoiceById(order.getOrderId());
            if (!prescriptionInvoiceService.checkMedicineStockForPrescriptionInvoice(prescriptionInvoice)) {
                throw new VNPayException("Không đủ tồn kho để thanh toán hóa đơn");
            }
            totalAmount = prescriptionInvoice.getTotalAmount() * 100L;
        } else {
            throw new IllegalArgumentException("Lỗi tạo hóa đơn do sai loại");
        }

        String transactionReference = VNPayUtil.getRandomNumber(8);
        String clientIpRequest = VNPayUtil.getIpAddress(request);

        String terminalCode = this.getTerminalCode();

        Map<String, String> vnpayParams = new HashMap<>();
        vnpayParams.put("vnp_Version", version);
        vnpayParams.put("vnp_Command", command);
        vnpayParams.put("vnp_TmnCode", terminalCode);

        vnpayParams.put("vnp_Amount", String.valueOf(totalAmount));
        vnpayParams.put("vnp_CurrCode", "VND");
        vnpayParams.put("vnp_TxnRef", transactionReference);
        vnpayParams.put("vnp_OrderInfo", "HD " + orderRequestType + " " + order.getOrderId());
        vnpayParams.put("vnp_OrderType", orderType);
        vnpayParams.put("vnp_Locale", "vn");
        vnpayParams.put("vnp_ReturnUrl", this.getReturnUrl());
        vnpayParams.put("vnp_IpAddr", clientIpRequest);

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String createDate = formatter.format(calendar.getTime());
        vnpayParams.put("vnp_CreateDate", createDate);

        calendar.add(Calendar.MINUTE, 15);

        String expirationDate = formatter.format(calendar.getTime());
        vnpayParams.put("vnp_ExpireDate", expirationDate);

        List<String> sortedFields = new ArrayList<>(vnpayParams.keySet());
        Collections.sort(sortedFields);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Iterator<String> iterator = sortedFields.iterator(); iterator.hasNext();) {
            String fieldName = iterator.next();
            String fieldValue = vnpayParams.get(fieldName);

            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                if (iterator.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }

        String secureHash = VNPayUtil.hmacSHA512(this.getSecretKey(), hashData.toString());
        query.append("&vnp_SecureHash=");
        query.append(secureHash);
        String paymentUrl = this.getUrlPayment() + "?" + query.toString();

        return paymentUrl;
    }

    /**
     * Validate VNPay payment callback
     * 
     * @param payCheck - Payment data from VNPay callback
     * @return true if valid, false otherwise
     */
    public boolean validatePaymentCallback(VNPayCheck payCheck) {
        Map<String, String> vnpayParams = new HashMap<>();
        vnpayParams.put("vnp_Amount", payCheck.getAmount());
        vnpayParams.put("vnp_BankCode", payCheck.getBankCode());
        vnpayParams.put("vnp_BankTranNo", payCheck.getBankTranNo());
        vnpayParams.put("vnp_CardType", payCheck.getCardType());
        vnpayParams.put("vnp_OrderInfo", payCheck.getOrderInfo());
        vnpayParams.put("vnp_PayDate", payCheck.getPayDate());
        vnpayParams.put("vnp_ResponseCode", payCheck.getResponseCode());
        vnpayParams.put("vnp_TmnCode", payCheck.getTmnCode());
        vnpayParams.put("vnp_TransactionNo", payCheck.getTransactionNo());
        vnpayParams.put("vnp_TransactionStatus", payCheck.getTransactionStatus());
        vnpayParams.put("vnp_TxnRef", payCheck.getTxnRef());

        List<String> sortedFields = new ArrayList<>(vnpayParams.keySet());
        Collections.sort(sortedFields);

        StringBuilder hashData = new StringBuilder();
        for (Iterator<String> iterator = sortedFields.iterator(); iterator.hasNext();) {
            String fieldName = iterator.next();
            String fieldValue = vnpayParams.get(fieldName);

            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                if (iterator.hasNext()) {
                    hashData.append("&");
                }
            }
        }

        String expectedSecureHash = VNPayUtil.hmacSHA512(this.getSecretKey(), hashData.toString());
        return expectedSecureHash.equalsIgnoreCase(payCheck.getSecureHash());
    }

    /**
     * Process payment callback and update invoice status
     * 
     * @param payCheck - Payment data from VNPay callback
     * @return CheckPayment response (isPaid, directUrl)
     */
    public VNPayResponse.CheckPayment processPaymentCallback(VNPayCheck payCheck, Authentication authentication) {
        VNPayResponse.CheckPayment response = new VNPayResponse.CheckPayment();

        if (!validatePaymentCallback(payCheck)) {
            throw new VNPayException("Chữ ký không hợp lệ");
        }
        if (!payCheck.getTmnCode().equals(this.getTerminalCode())) {
            throw new VNPayException("Mã TMN không hợp lệ");
        }
        if (!"00".equals(payCheck.getTransactionStatus()) || !"00".equals(payCheck.getResponseCode())) {
            throw new VNPayException("Giao dịch không thành công");
        }

        // Extract order info: "HD SERVICE INVOICE 123" or "HD PRESCRIPTION INVOICE 456"
        String orderInfo = payCheck.getOrderInfo();
        String[] parts = orderInfo.split(" ");

        if (parts.length < 4) {
            throw new VNPayException("Thông tin đơn hàng không hợp lệ");
        }

        // "SERVICE INVOICE" or "PRESCRIPTION INVOICE"
        String orderType = parts[1] + " " + parts[2];
        Long orderId = Long.parseLong(parts[3]);

        Long receivedAmount = Long.parseLong(payCheck.getAmount()) / 100;

        if ("SERVICE INVOICE".equals(orderType)) {
            ServiceInvoiceModel invoice = serviceInvoiceService.getServiceInvoiceById(orderId);
            if (!invoice.getTotalAmount().equals(receivedAmount)) {
                throw new VNPayException("Số tiền không khớp");
            }
            if (!invoice.getStatus().equals("PENDING")) {
                throw new VNPayException("Hóa đơn đã được thanh toán hoặc hủy");
            }

            invoice.setVnpayRef(payCheck.getTxnRef());
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

            invoice.setVnpayRef(payCheck.getTxnRef());
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