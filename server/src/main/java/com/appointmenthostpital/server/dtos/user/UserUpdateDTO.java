package com.appointmenthostpital.server.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserUpdateDTO {
    public static class UpdateProfileRequest {
        @NotNull(message = "Nhập họ và tên của bạn")
        @NotBlank(message = "Họ và tên không được để trống")
        @Size(max = 50, message = "Họ và tên tối đa 50 ký tự")
        private String fullName;

        @NotNull(message = "Nhập số điện thoại của bạn")
        @NotBlank(message = "Số điện thoại không được để trống")
        @Pattern(regexp = "^[0-9]{10,11}$", message = "Số điện thoại không hợp lệ")
        private String phone;

        @NotNull(message = "Nhập địa chỉ của bạn")
        @Size(max = 100, message = "Địa chỉ không được quá 100 ký tự")
        private String address;

        @NotNull(message = "Nhập ngày sinh của bạn")
        @NotBlank(message = "Ngày sinh không được để trống")
        @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Ngày sinh phải có định dạng yyyy-MM-dd")
        private String birthDate;

        public UpdateProfileRequest(String fullName, String phone, String address, String birthDate) {
            this.fullName = fullName;
            this.phone = phone;
            this.address = address;
            this.birthDate = birthDate;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(String birthDate) {
            this.birthDate = birthDate;
        }
    }
}
