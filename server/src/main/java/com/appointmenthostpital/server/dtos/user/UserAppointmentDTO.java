package com.appointmenthostpital.server.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserAppointmentDTO {
    public static class CreateAppointmentRequest {
        @NotNull(message = "Nhập họ tên người khám")
        @NotBlank(message = "Họ và tên không được để trống")
        private String fullName;

        @NotNull(message = "Nhập số điện thoại người khám")
        @NotBlank(message = "Số điện thoại không được để trống")
        private String phone;

        @NotNull(message = "Nhập ngày hẹn")
        @NotBlank(message = "Ngày hẹn không được để trống")
        private String date;

        @NotNull(message = "Nhập giờ hẹn")
        @NotBlank(message = "Giờ hẹn không được để trống")
        private String time;
        private String note;

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

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public String getNote() {
            return note;
        }
        
        public void setNote(String note) {
            this.note = note;
        }
    }

    public static class CreateAppointmentResponse {
        private String fullName;
        private String phone;
        private String time;
        private String note;
        private String status;

        public CreateAppointmentResponse(String fullName, String phone, String time, String note, String status) {
            this.fullName = fullName;
            this.phone = phone;
            this.time = time;
            this.note = note;
            this.status = status;
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

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public String getNote() {
            return note;
        }

        public void setNote(String note) {
            this.note = note;
        }

        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
    }
}
