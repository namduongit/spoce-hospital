package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AdminRoomDTO {
    public static class CreateRoomRequest {
        @NotNull(message = "Yêu cầu nhập tên phòng")
        @NotBlank(message = "Tên phòng không được để trống")
        private String name;

        @NotNull(message = "Yêu cầu nhập trạng thái")
        @Pattern(regexp = "EMPTY|FULL|REPAIR", message = "Trạng thái phòng không đúng")
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
