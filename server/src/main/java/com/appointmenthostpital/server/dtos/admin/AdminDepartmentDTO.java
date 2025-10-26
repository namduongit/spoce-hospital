package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdminDepartmentDTO {
    public static class CreateDepartmentRequest {
        @NotNull(message = "Yêu cầu nhập tên khoa")
        @NotBlank(message = "Tên khoa không được để trống")
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class UpdateDepartmentRequest {
        @NotNull(message = "Yêu cầu nhập tên khoa")
        @NotBlank(message = "Tên khoa không được để trống")
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
