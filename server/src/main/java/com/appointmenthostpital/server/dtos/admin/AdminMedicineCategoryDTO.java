package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AdminMedicineCategoryDTO {
    public static class CreateCategoryRequest {
        @NotNull(message = "Yêu cầu nhập tên danh mục")
        @NotBlank(message = "Tên danh mục không được để trống")
        @Size(max = 50, message = "Tên danh mục không được vượt quá 50 ký tự")
        private String name;

        @NotNull(message = "Yêu cầu nhập mô tả danh mục")
        @NotBlank(message = "Mô tả danh mục không được để trống")
        @Size(max = 100, message = "Mô tả không được vượt quá 100 ký tự")
        private String description;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class UpdateCategoryRequest {
        @NotBlank(message = "Tên danh mục không được để trống")
        @Size(max = 255, message = "Tên danh mục không được vượt quá 255 ký tự")
        private String name;

        @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
        private String description;

        private String status;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
