package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AdminUserDTO {
    public static class CreateAccountRequest {
        @NotBlank(message = "Không được để trống email")
        @Pattern(regexp = "^[A-Za-z].{5,}@gmail\\.com$", message = "Email không đúng định dạng")
        private String email;
        @NotBlank(message = "Không được để trống mật khẩu")
        @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 kí tự")
        private String password;
        @NotBlank(message = "Không được để trống mật khẩu xác nhận")
        @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 kí tự")
        private String passwordConfirm;
        @NotBlank(message = "Quyền tài khoản không được để trống")
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

        @Override
        public String toString() {
            return "CreateAccountRequest [email=" + email + ", password=" + password + ", passwordConfirm="
                    + passwordConfirm + ", role=" + role + "]";
        }
    }

    public static class UpdateAccountRequest {
        private String email;
        private String password;
        private String role;
        private String type;
        private String status;

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

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
    }
}
