package com.appointmenthostpital.server.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterDTO {
    public static class RegisterRequest {
        @NotBlank(message = "Không được để trống email")
        @Pattern(regexp = "^[A-Za-z].{5,}@gmail\\.com$", message = "Email không đúng định dạng")
        private String email;
        @NotBlank(message = "Không được để trống mật khẩu")
        @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 kí tự")
        private String password;
        @NotBlank(message = "Không được để trống mật khẩu xác nhận")
        @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 kí tự")
        private String passwordConfirm;

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

        @Override
        public String toString() {
            return "RegisterRequestDTO [email=" + email + ", password=" + password + ", passwordConfirm="
                    + passwordConfirm + "]";
        }
    }

    public static class RegisterResponse {
        private Long id;
        private String email;
        private String role;
        private String type;
        private String createAt;

        public RegisterResponse(Long id, String email, String role, String type, String createAt) {
            this.id = id;
            this.email = email;
            this.role = role;
            this.type = type;
            this.createAt = createAt;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
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

        public String getCreateAt() {
            return createAt;
        }

        public void setCreateAt(String createAt) {
            this.createAt = createAt;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        @Override
        public String toString() {
            return "RegisterResponseDTO [id=" + id + ", email=" + email + ", role=" + role + ", type=" + type
                    + ", createAt=" + createAt + "]";
        }
    }
}
