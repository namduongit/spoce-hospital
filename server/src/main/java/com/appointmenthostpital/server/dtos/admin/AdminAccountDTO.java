package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AdminAccountDTO {
    public static class CreateAccountRequest {
        @NotNull(message = "Yêu cầu nhập email")
        @NotBlank(message = "Email không được để trống")
        @Pattern(regexp = "^[A-Za-z].{5,}@gmail\\.com$", message = "Email không đúng định dạng")
        private String email;

        @NotNull(message = "Yêu cầu nhập mật khẩu")
        @NotBlank(message = "Mật khẩu không được để trống")
        private String password;

        @NotNull(message = "Yêu cầu nhập mật khẩu xác nhận")
        @NotBlank(message = "Mật khẩu xác nhận không được để trống")
        private String passwordConfirm;

        @NotNull(message = "Yêu cầu nhập quyền tài khoản")
        @Pattern(regexp = "USER|ASSISTOR|DOCTOR|ADMIN", message = "Quyền tài khoản không đúng")
        private String role;

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

        public String getPasswordConfirm() {
            return passwordConfirm;
        }

        public void setPasswordConfirm(String passwordConfirm) {
            this.passwordConfirm = passwordConfirm;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }

    public static class UpdateAccountRequest {
        @NotNull(message = "Yêu cầu nhập mật khẩu")
        @NotBlank(message = "Mật khẩu không được để trống")
        private String password;

        @NotNull(message = "Yêu cầu nhập quyền tài khoản")
        @Pattern(regexp = "USER|ASSISTOR|DOCTOR|ADMIN", message = "Quyền tài khoản không đúng")
        private String role;

        @NotNull(message = "Yêu cầu nhập trạng thái tài khoản")
        @Pattern(regexp = "ACTIVE|INACTIVE", message = "Trạng thái tài khoản không đúng")
        private String status;

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
    }
}
