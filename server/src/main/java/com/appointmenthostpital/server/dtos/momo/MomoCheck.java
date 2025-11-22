package com.appointmenthostpital.server.dtos.momo;

import jakarta.validation.constraints.NotNull;

public class MomoCheck { 
    @NotNull(message = "Yêu cầu mã đối tác")
    @NotNull(message = "Mã đối tác không được để trống")
    private String partnerCode;
    @NotNull(message = "Yêu cầu mã đơn hàng")
    @NotNull(message = "Mã đơn hàng không được để trống")
    private String orderId;
    @NotNull(message = "Yêu cầu mã yêu cầu")
    @NotNull(message = "Mã yêu cầu không được để trống")
    private String requestId;
    @NotNull(message = "Yêu cầu tổng tiền")
    private Long amount;
    @NotNull(message = "Yêu cầu thông tin đơn hàng")
    @NotNull(message = "Thông tin đơn hàng không được để trống")
    private String orderInfo;
    @NotNull(message = "Yêu cầu loại đơn hàng")
    @NotNull(message = "Loại đơn hàng không được để trống")
    private String orderType;
    @NotNull(message = "Yêu cầu mã giao dịch")
    @NotNull(message = "Mã giao dịch không được để trống")
    private String transId;
    @NotNull(message = "Yêu cầu mã kết quả")
    @NotNull(message = "Mã kết quả không được để trống")
    private String resultCode;
    @NotNull(message = "Yêu cầu thông điệp")
    @NotNull(message = "Thông điệp không được để trống")
    private String message;
    @NotNull(message = "Yêu cầu loại thanh toán")
    @NotNull(message = "Loại thanh toán không được để trống")
    private String payType;
    @NotNull(message = "Yêu cầu dữ liệu bổ sung")
    @NotNull(message = "Dữ liệu bổ sung không được để trống")
    private String extraData;
    @NotNull(message = "Yêu cầu chữ ký")
    @NotNull(message = "Chữ ký không được để trống")
    private String signature;
    
    @NotNull(message = "Yêu cầu thời gian phản hồi")
    private Long responseTime;

    public String getPartnerCode() {
        return partnerCode;
    }

    public void setPartnerCode(String partnerCode) {
        this.partnerCode = partnerCode;
    }

    public String getOrderId() {
        return orderId;
    }
    
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
    
    public String getOrderInfo() {
        return orderInfo;
    }

    public void setOrderInfo(String orderInfo) {
        this.orderInfo = orderInfo;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getTransId() {
        return transId;
    }

    public void setTransId(String transId) {
        this.transId = transId;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }
    
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getExtraData() {
        return extraData;
    }
    
    public void setExtraData(String extraData) {
        this.extraData = extraData;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
    
    public Long getResponseTime() {
        return responseTime;
    }
    
    public void setResponseTime(Long responseTime) {
        this.responseTime = responseTime;
    }
}
