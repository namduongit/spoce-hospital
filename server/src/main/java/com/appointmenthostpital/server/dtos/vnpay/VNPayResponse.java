package com.appointmenthostpital.server.dtos.vnpay;

public class VNPayResponse {
    public static class Payment {
        private String paymentUrl;
        private String requestFrom;

        public String getPaymentUrl() {
            return paymentUrl;
        }

        public void setPaymentUrl(String paymentUrl) {
            this.paymentUrl = paymentUrl;
        }

        public String getRequestFrom() {
            return requestFrom;
        }

        public void setRequestFrom(String requestFrom) {
            this.requestFrom = requestFrom;
        }
    }

    public static class CheckPayment {
        private boolean isPaid;
        private Long orderId;
        private String orderType;
        private Long amount;
        private String directUrl;

        public boolean isPaid() {
            return isPaid;
        }

        public void setPaid(boolean isPaid) {
            this.isPaid = isPaid;
        }

        public Long getOrderId() {
            return orderId;
        }

        public void setOrderId(Long orderId) {
            this.orderId = orderId;
        }

        public String getOrderType() {
            return orderType;
        }

        public void setOrderType(String orderType) {
            this.orderType = orderType;
        }

        public Long getAmount() {
            return amount;
        }

        public void setAmount(Long amount) {
            this.amount = amount;
        }

        public String getDirectUrl() {
            return directUrl;
        }

        public void setDirectUrl(String directUrl) {
            this.directUrl = directUrl;
        }
    }
}
