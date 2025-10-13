package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;

public class AdminDepartmentDTO {
    public static class CreateDepartmentRequest {
        @NotBlank(message = "Tên khoa không được để trống")
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class CreateDepartmentResponse {
        private Long id;
        private String name;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
