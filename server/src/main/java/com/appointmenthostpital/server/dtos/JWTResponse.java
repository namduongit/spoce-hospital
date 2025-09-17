package com.appointmenthostpital.server.dtos;

public class JWTResponse {
    private String accessToken;
    private int now;
    private int validity;

    public JWTResponse(String accessToken, int now, int validity) {
        this.accessToken = accessToken;
        this.now = now;
        this.validity = validity;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public int getNow() {
        return now;
    }

    public void setNow(int now) {
        this.now = now;
    }

    public int getValidity() {
        return validity;
    }

    public void setValidity(int validity) {
        this.validity = validity;
    }

    @Override
    public String toString() {
        return "JWTResponse [accessToken=" + accessToken + ", now=" + now + ", validity=" + validity + "]";
    }
}
