package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AdminAppointmentDTO {
    public static class UpdateAppointmentRequest {
        @NotNull(message = "Yêu cầu nhập số điện thoại")
        @NotBlank(message = "Số điện thoại không được để trống")
        private String phone;

        @NotNull(message = "Yêu cầu nhập thời gian")
        @NotBlank(message = "Thời gian không được để trống")
        private String time;

        @NotNull(message = "Yêu cầu nhập ghi chú")
        @NotBlank(message = "Ghi chú không được để trống")
        private String note;

        @NotNull(message = "Yêu cầu nhập trạng thái")
        @Pattern(regexp = "PENDING|CONFIRMED|CANCELLED|COMPLETED", message = "Trạng thái không đúng")
        private String status;

        @NotNull(message = "Yêu cầu nhập khoa")
        private Long departmentId;
        @NotNull(message = "Yêu cầu nhập bác sĩ")
        private Long doctorId;
        @NotNull(message = "Yêu cầu nhập phòng")
        private Long roomId;

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

        public Long getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Long departmentId) {
            this.departmentId = departmentId;
        }

        public Long getDoctorId() {
            return doctorId;
        }

        public void setDoctorId(Long doctorId) {
            this.doctorId = doctorId;
        }

        public Long getRoomId() {
            return roomId;
        }

        public void setRoomId(Long roomId) {
            this.roomId = roomId;
        }
    }

    public static class ChangeStatusRequest {
        @NotNull(message = "Yêu cầu nhập trạng thái")
        @Pattern(regexp = "PENDING|CONFIRMED|CANCELLED|COMPLETED", message = "Trạng thái không đúng")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
