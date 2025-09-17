package com.appointmenthostpital.server.dtos;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {
    public static class LoginRequest {
        @NotBlank(message = "Email không được để trống")
        private String email;
        @NotBlank(message = "Mật khẩu không được để trống")
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        @Override
        public String toString() {
            return "LoginRequest [email=" + email + ", password=" + password + "]";
        }
    }

    public static class LoginResponse {
        private String accessToken;
        private String email;
        private String role;
        private int issuedAt;
        private int expiresAt;

        public LoginResponse(String accessToken, String email, String role, int issuedAt, int expiresAt) {
            this.accessToken = accessToken;
            this.email = email;
            this.role = role;
            this.issuedAt = issuedAt;
            this.expiresAt = expiresAt;
        }

        public String getAccessToken() {
            return accessToken;
        }

        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
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
    }
}
