package com.appointmenthostpital.server.utils;

import java.util.HexFormat;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class MomoUtil {
    public static String getRandomUUID() {
        return UUID.randomUUID().toString();
    }

    public static String hmacSHA256(String data, String key) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
        hmac.init(secretKey);
        return HexFormat.of().formatHex(hmac.doFinal(data.getBytes("UTF-8")));
    }
}
