package com.appointmenthostpital.server.dtos;

public class JWTResponse {
    private String accessToken;
    private String role;
    private int now;
    private int validity;
    
    public JWTResponse(String accessToken, String role, int now, int validity) {
        this.accessToken = accessToken;
        this.role = role;
        this.now = now;
        this.validity = validity;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
        return "JWTResponse [accessToken=" + accessToken + ", role=" + role + ", now=" + now + ", validity=" + validity
                + "]";
    }
}
