package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdminRoomDTO {
    public static class CreateRoomRequest {
        @NotBlank(message = "Tên phòng không được để trống")
        private String name;
        @NotBlank(message = "Trạng thái không được để trống")
        private String status;
        @NotNull(message = "Khoa khám không được để trống")
        private Long departmentId;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
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

    public static class UpdateRoomRequest {
        @NotBlank(message = "Tên phòng không được để trống")
        private String name;
        @NotBlank(message = "Trạng thái không được để trống")
        private String status;
        @NotNull(message = "Khoa khám không được để trống")
        private Long departmentId;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
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
}
