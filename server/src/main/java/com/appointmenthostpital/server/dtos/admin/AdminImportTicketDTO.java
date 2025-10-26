package com.appointmenthostpital.server.dtos.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public class AdminImportTicketDTO {
    
    public static class CreateImportTicketRequest {
        @NotNull(message = "Yêu cầu nhập tên nhà cung cấp")
        @NotBlank(message = "Tên nhà cung cấp không được để trống")
        private String supplierName;
        
        private String reason;
        
        private List<ImportItemRequest> items = new ArrayList<>();

        public String getSupplierName() {
            return supplierName;
        }

        public void setSupplierName(String supplierName) {
            this.supplierName = supplierName;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public List<ImportItemRequest> getItems() {
            return items;
        }

        public void setItems(List<ImportItemRequest> items) {
            this.items = items;
        }
    }
    
    public static class ImportItemRequest {
        @NotNull(message = "Yêu cầu chọn thuốc")
        private Long medicineId;
        
        @NotNull(message = "Yêu cầu nhập số lượng")
        @Positive(message = "Số lượng phải lớn hơn 0")
        private Integer quantity;
        
        @NotNull(message = "Yêu cầu nhập đơn giá")
        @Positive(message = "Đơn giá phải lớn hơn 0")
        private Long unitPrice;
        
        private Date expiryDate;

        public Long getMedicineId() {
            return medicineId;
        }

        public void setMedicineId(Long medicineId) {
            this.medicineId = medicineId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public Long getUnitPrice() {
            return unitPrice;
        }

        public void setUnitPrice(Long unitPrice) {
            this.unitPrice = unitPrice;
        }

        public Date getExpiryDate() {
            return expiryDate;
        }

        public void setExpiryDate(Date expiryDate) {
            this.expiryDate = expiryDate;
        }
    }

    public static class ChangeImportTicketStatusRequest {
        @NotNull(message = "Yêu cầu nhập trạng thái phiếu nhập")
        @Pattern(regexp = "^(PENDING|COMPLETED|CANCELLED)$", message = "Trạng thái phiếu nhập không hợp lệ")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
