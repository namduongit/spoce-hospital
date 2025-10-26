package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AdminDoctorDTO {
    public static class CreateDoctorRequest {
        @NotNull(message = "Yêu cầu nhập email")
        @NotBlank(message = "Không được để trống email")
        @Pattern(regexp = "^[A-Za-z].{5,}@gmail\\.com$", message = "Email không đúng định dạng")
        private String email;

        @NotNull(message = "Yêu cầu nhập mật khẩu")
        @NotBlank(message = "Không được để trống mật khẩu")
        private String password;

        @NotNull(message = "Yêu cầu nhập mật khẩu xác nhận")
        @NotBlank(message = "Không được để trống mật khẩu xác nhận")
        private String passwordConfirm;

        @NotNull(message = "Yêu cầu nhập ảnh đại diện")
        @NotBlank(message = "Không được để trống ảnh đại diện")
        private String image;

        @NotNull(message = "Yêu cầu nhập họ và tên")
        @NotBlank(message = "Không được để trống họ và tên")
        private String fullName;

        @NotNull(message = "Yêu cầu nhập ngày sinh")
        @NotBlank(message = "Không được để trống ngày sinh")
        private String birthDate;
        
        @NotNull(message = "Yêu cầu nhập số điện thoại")
        @NotBlank(message = "Không được để trống số điện thoại")
        private String phone;

        @NotNull(message = "Yêu cầu nhập giới tính")
        @NotBlank(message = "Không được để trống giới tính")
        private String gender;

        @NotNull(message = "Yêu cầu nhập học vị")
        @NotBlank(message = "Không được để trống học vị")
        private String degree;

        @NotNull(message = "Không được để trống khoa")
        private Long departmentId;

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

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(String birthDate) {
            this.birthDate = birthDate;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public Long getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Long departmentId) {
            this.departmentId = departmentId;
        }

        public String getDegree() {
            return degree;
        }

        public void setDegree(String degree) {
            this.degree = degree;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }

    public static class UpdateDoctorRequest {
        @NotNull(message = "Yêu cầu nhập ảnh đại diện")
        // @NotBlank(message = "Không được để trống ảnh đại diện")
        private String image;

        @NotNull(message = "Yêu cầu nhập họ và tên")
        @NotBlank(message = "Không được để trống họ và tên")
        private String fullName;

        @NotNull(message = "Yêu cầu nhập ngày sinh")
        @NotBlank(message = "Không được để trống ngày sinh")
        private String birthDate;

        @NotNull(message = "Yêu cầu nhập số điện thoại")
        @NotBlank(message = "Không được để trống số điện thoại")
        private String phone;

        @NotNull(message = "Yêu cầu nhập giới tính")
        @Pattern(regexp = "MALE|FEMALE|OTHER", message = "Giới tính không đúng")
        private String gender;

        @NotNull(message = "Yêu cầu nhập học vị")
        @NotBlank(message = "Không được để trống học vị")
        private String degree;

        @NotNull(message = "Yêu cầu nhập trạng thái")
        @Pattern(regexp = "AVAILABLE|BUSY|OFFLINE", message = "Trạng thái không đúng")
        private String status;

        @NotNull(message = "Không được để trống khoa")
        private Long departmentId;

        public String getImage() {  
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(String birthDate) {
            this.birthDate = birthDate;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getDegree() {
            return degree;
        }

        public void setDegree(String degree) {
            this.degree = degree;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Long getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Long departmentId) {
            this.departmentId = departmentId;
        }
    }

    public static class UpdateDoctorWorkDayRequest {
        @NotNull(message = "Yêu cầu nhập ngày làm việc")
        @NotBlank(message = "Không được để trống ngày làm việc")
        private String workDay;

        public String getWorkDay() {
            return workDay;
        }

        public void setWorkDay(String workDay) {
            this.workDay = workDay;
        }
    }
}
