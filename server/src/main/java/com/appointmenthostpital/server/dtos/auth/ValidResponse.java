package com.appointmenthostpital.server.dtos.auth;

public class ValidResponse {
    private String email;
    private String role;
    private int issuedAt;
    private int expiresAt;

    public ValidResponse(String email, String role, int issuedAt, int expiresAt) {
        this.email = email;
        this.role = role;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public int getIssuedAt() {
        return issuedAt;
    }
    
    public void setIssuedAt(int issuedAt) {
        this.issuedAt = issuedAt;
    }
    
    public int getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(int expiresAt) {
        this.expiresAt = expiresAt;
    }

    @Override
    public String toString() {
        return "ValidResponse [email=" + email + ", role=" + role + ", issuedAt="
                + issuedAt + ", expiresAt=" + expiresAt + "]";
    }
}
