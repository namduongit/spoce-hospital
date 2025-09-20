package com.appointmenthostpital.server.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserUpdateDTO {

    public static class UpdateProfileRequest {
        @NotBlank(message = "Họ và tên không được để trống")
        @Size(min = 2, max = 100, message = "Họ và tên phải từ 2-100 ký tự")
        private String fullName;

        @NotBlank(message = "Số điện thoại không được để trống")
        @Pattern(regexp = "^[0-9]{10,11}$", message = "Số điện thoại không hợp lệ")
        private String phone;

        @Size(max = 500, message = "Địa chỉ không được quá 500 ký tự")
        private String address;

        @NotBlank(message = "Ngày sinh không được để trống")
        @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Ngày sinh phải có định dạng yyyy-MM-dd")
        private String birthDate;

        public UpdateProfileRequest() {
        }

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

    public static class UpdateProfileResponse {
        private Long id;
        private String fullName;
        private String phone;
        private String address;
        private String birthDay;
        private String message;

        public UpdateProfileResponse() {
        }

        public UpdateProfileResponse(Long id, String fullName, String phone, String address, String birthDay,
                String message) {
            this.id = id;
            this.fullName = fullName;
            this.phone = phone;
            this.address = address;
            this.birthDay = birthDay;
            this.message = message;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
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

        public String getBirthDay() {
            return birthDay;
        }

        public void setBirthDay(String birthDay) {
            this.birthDay = birthDay;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
