package com.appointmenthostpital.server.configs;

import org.springframework.beans.factory.annotation.Value;

public class MomoConfig {
    /**
     * MOMO_PARTNER_CODE=MOMOLRJZ20181206
MOMO_ACCESS_KEY=mTCKt9W3eU1m39TW
MOMO_SECRET_KEY=SetA5RDnLHvt51AULf51DyauxUo3kDU6
MOMO_URL_PAYMENT=https://test-payment.momo.vn/v2/gateway/api/create
MOMO_RETURN_URL=http://localhost:5173/api/payment/momo-return
     */

    @Value("${MOMO_PARTNER_CODE}")
    private String MOMO_PARTNER_CODE;

    @Value("${MOMO_ACCESS_KEY}")
    private String MOMO_ACCESS_KEY;

    @Value("${MOMO_SECRET_KEY}")
    private String MOMO_SECRET_KEY;

    @Value("${MOMO_URL_PAYMENT}")
    private String MOMO_URL_PAYMENT;

    @Value("${MOMO_RETURN_URL}")
    private String MOMO_RETURN_URL;

    @Value("${MOMO_IPN_URL}")
    private String MOMO_IPN_URL;

    protected String getPartnerCode() {
        return MOMO_PARTNER_CODE;
    }

    protected String getAccessKey() {
        return MOMO_ACCESS_KEY;
    }

    protected String getSecretKey() {
        return MOMO_SECRET_KEY;
    }

    protected String getUrlPayment() {
        return MOMO_URL_PAYMENT;
    }

    protected String getReturnUrl() {
        return MOMO_RETURN_URL;
    }

    protected String getIpnUrl() {
        return MOMO_IPN_URL;
    }
}
