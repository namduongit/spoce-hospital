package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AdminMedicineDTO {

    public static class CreateMedicineRequest {
        @NotNull(message = "Yêu cầu nhập tên thuốc")
        @NotBlank(message = "Tên thuốc không được để trống")
        @Size(max = 50, message = "Tên thuốc không được vượt quá 50 ký tự")
        private String name;

        @NotNull(message = "Yêu cầu nhập mô tả thuốc này")
        @NotBlank(message = "Mô tả thuốc không được để trống")
        @Size(max = 100, message = "Mô tả không được vượt quá 100 ký tự")
        private String description;

        @NotNull(message = "Yêu cầu nhập đơn vị")
        @NotBlank(message = "Đơn vị tính không được để trống")
        private String unit;

        @NotNull(message = "Giá bán không được để trống")
        @Min(value = 0, message = "Giá bán phải lớn hơn hoặc bằng 0")
        private Long price;

        private String barcode;

        private String manufacturer;

        private String status = "ACTIVE";

        @Min(value = 0, message = "Số lượng hiện tại không được âm")
        private Integer currentStock = 0;

        @Min(value = 0, message = "Số lượng tối thiểu không được âm")
        private Integer minStock = 0;

        @Min(value = 1, message = "Số lượng tối đa phải lớn hơn 0")
        private Integer maxStock = 1000;

        @NotNull(message = "Yêu cầu nhập mã danh mục")
        private Long categoryId;

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

        public String getUnit() {
            return unit;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }

        public Long getPrice() {
            return price;
        }

        public void setPrice(Long price) {
            this.price = price;
        }

        public String getBarcode() {
            return barcode;
        }

        public void setBarcode(String barcode) {
            this.barcode = barcode;
        }

        public String getManufacturer() {
            return manufacturer;
        }

        public void setManufacturer(String manufacturer) {
            this.manufacturer = manufacturer;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Integer getCurrentStock() {
            return currentStock;
        }

        public void setCurrentStock(Integer currentStock) {
            this.currentStock = currentStock;
        }

        public Integer getMinStock() {
            return minStock;
        }

        public void setMinStock(Integer minStock) {
            this.minStock = minStock;
        }

        public Integer getMaxStock() {
            return maxStock;
        }

        public void setMaxStock(Integer maxStock) {
            this.maxStock = maxStock;
        }

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }

    public static class UpdateMedicineRequest {
        @NotNull(message = "Yêu cầu nhập tên thuốc")
        @NotBlank(message = "Tên thuốc không được để trống")
        @Size(max = 255, message = "Tên thuốc không được vượt quá 255 ký tự")
        private String name;

        @NotNull(message = "Yêu cầu nhập mô tả thuốc này")
        @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
        private String description;

        @NotBlank(message = "Đơn vị tính không được để trống")
        private String unit;

        @NotNull(message = "Giá bán không được để trống")
        @Min(value = 0, message = "Giá bán phải lớn hơn 0")
        private Long price;

        @NotNull(message = "Yêu cầu nhập nhà sản xuất")
        @NotBlank(message = "Nhà sản xuất không được để trống")
        private String manufacturer;

        @NotNull(message = "Yêu cầu nhập trạng thái thuốc")
        @Pattern(regexp = "ACTIVE|INACTIVE|OUT_OF_STOCK", message = "Trạng thái thuốc không hợp lệ")
        private String status;

        @NotNull(message = "Yêu cầu nhập số lượng tối thiểu")
        @NotBlank(message = "Số lượng tối thiểu không được để trống")
        @Min(value = 0, message = "Số lượng tối thiểu không được âm")
        private Integer minStock;

        @NotNull(message = "Yêu cầu nhập số lượng tối đa")
        @NotBlank(message = "Số lượng tối đa không được để trống")
        @Min(value = 1, message = "Số lượng tối đa phải lớn hơn 0")
        private Integer maxStock;

        @NotNull(message = "ID danh mục không được để trống")
        private Long categoryId;

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

        public String getUnit() {
            return unit;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }

        public Long getPrice() {
            return price;
        }

        public void setPrice(Long price) {
            this.price = price;
        }

        public String getManufacturer() {
            return manufacturer;
        }

        public void setManufacturer(String manufacturer) {
            this.manufacturer = manufacturer;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Integer getMinStock() {
            return minStock;
        }

        public void setMinStock(Integer minStock) {
            this.minStock = minStock;
        }

        public Integer getMaxStock() {
            return maxStock;
        }

        public void setMaxStock(Integer maxStock) {
            this.maxStock = maxStock;
        }

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }
}
