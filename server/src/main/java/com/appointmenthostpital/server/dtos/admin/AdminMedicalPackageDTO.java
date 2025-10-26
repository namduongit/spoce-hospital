package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AdminMedicalPackageDTO {
    public static class CreateMedicalPackageRequest {
        @NotNull(message = "Yêu cầu nhập tên gói dịch vụ")
        @NotBlank(message = "Tên gói không được để trống")
        private String name;

        @NotNull(message = "Yêu cầu nhập mô tả gói")
        @NotBlank(message = "Mô tả gói không được để trống")
        private String description;

        @NotNull(message = "Yêu cầu nhập trạng thái gói")
        @Pattern(regexp = "ACTIVE|INACTIVE", message = "Trạng gói thái không đúng")
        private String status;

        @NotNull(message = "Yêu cầu nhập giá tiền gói")
        @Min(value = 0, message = "Giá phải lớn hơn hoặc bằng 0")
        private Long price;

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

        public Long getPrice() {
            return price;
        }

        public void setPrice(Long price) {
            this.price = price;
        }
    }

    public static class UpdateMedicalPackageRequest {
        private String name;
        private String description;
        private String status;
        private Long price;

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

        public Long getPrice() {
            return price;
        }

        public void setPrice(Long price) {
            this.price = price;
        }
    }

    public static class ChangeMedicalPackageStatusRequest {
        @NotNull(message = "Yêu cầu nhập trạng thái gói")
        @Pattern(regexp = "ACTIVE|INACTIVE", message = "Trạng thái gói không đúng")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}