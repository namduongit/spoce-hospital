package com.appointmenthostpital.server.dtos.vnpay;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VNPayCheck {
    @NotNull(message = "Yêu cầu tổng tiền đơn")
    @NotBlank(message = "Tổng tiền đơn không được để trống")
    private String amount;
    @NotNull(message = "Yêu cầu mã ngân hàng")
    @NotBlank(message = "Mã ngân hàng không được để trống")
    private String bankCode;
    @NotNull(message = "Yêu cầu số giao dịch ngân hàng")
    @NotBlank(message = "Số giao dịch ngân hàng không được để trống")
    private String bankTranNo;
    @NotNull(message = "Yêu cầu loại thẻ")
    @NotBlank(message = "Loại thẻ không được để trống")
    private String cardType;
    @NotNull(message = "Yêu cầu thông tin đơn hàng")
    @NotBlank(message = "Thông tin đơn hàng không được để trống")
    private String orderInfo;
    @NotNull(message = "Yêu cầu ngày thanh toán")
    @NotBlank(message = "Ngày thanh toán không được để trống")
    private String payDate;
    @NotNull(message = "Yêu cầu mã phản hồi")
    @NotBlank(message = "Mã phản hồi không được để trống")
    private String responseCode;
    @NotNull(message = "Yêu cầu mã giao dịch")
    @NotBlank(message = "Mã giao dịch không được để trống")
    private String tmnCode;
    @NotNull(message = "Yêu cầu thông tin giao dịch")
    @NotBlank(message = "Thông tin giao dịch không được để trống")
    private String transactionNo;
    @NotNull(message = "Yêu cầu trạng thái giao dịch")
    @NotBlank(message = "Trạng thái giao dịch không được để trống")
    private String transactionStatus;
    @NotNull(message = "Yêu cầu tham chiếu giao dịch")
    @NotBlank(message = "Tham chiếu giao dịch không được để trống")
    private String txnRef;
    @NotNull(message = "Yêu cầu mã bảo mật")
    @NotBlank(message = "Mã bảo mật không được để trống")
    private String secureHash;

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }
    
    public String getBankTranNo() {
        return bankTranNo;
    }

    public void setBankTranNo(String bankTranNo) {
        this.bankTranNo = bankTranNo;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getOrderInfo() {
        return orderInfo;
    }

    public void setOrderInfo(String orderInfo) {
        this.orderInfo = orderInfo;
    }

    public String getPayDate() {
        return payDate;
    }

    public void setPayDate(String payDate) {
        this.payDate = payDate;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public String getTmnCode() {
        return tmnCode;
    }

    public void setTmnCode(String tmnCode) {
        this.tmnCode = tmnCode;
    }

    public String getTransactionNo() {
        return transactionNo;
    }

    public void setTransactionNo(String transactionNo) {
        this.transactionNo = transactionNo;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(String transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public String getTxnRef() {
        return txnRef;
    }

    public void setTxnRef(String txnRef) {
        this.txnRef = txnRef;
    }

    public String getSecureHash() {
        return secureHash;
    }

    public void setSecureHash(String secureHash) {
        this.secureHash = secureHash;
    }
}
