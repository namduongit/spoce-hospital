package com.appointmenthostpital.server.configs;
import org.springframework.beans.factory.annotation.Value;

public class VNPayConfig {
    @Value("${VNPAY_TERMINAL_CODE}")
    private String VNPAY_TERMINAL_CODE;

    @Value("${VNPAY_SECRET_KEY}")
    private String VNPAY_SECRET_KEY;

    @Value("${VNPAY_URL_PAYMENT}")
    private String VNPAY_URL_PAYMENT;

    @Value("${VNPAY_RETURN_URL}")
    private String VNPAY_RETURN_URL;

    protected String getTerminalCode() {
        return VNPAY_TERMINAL_CODE;
    }

    protected String getSecretKey() {
        return VNPAY_SECRET_KEY;
    }

    protected String getUrlPayment() {
        return VNPAY_URL_PAYMENT;
    }

    protected String getReturnUrl() {
        return VNPAY_RETURN_URL;
    }
}
