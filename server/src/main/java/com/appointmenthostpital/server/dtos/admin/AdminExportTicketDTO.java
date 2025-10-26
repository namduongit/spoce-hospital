package com.appointmenthostpital.server.dtos.admin;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public class AdminExportTicketDTO {
    public static class CreateExportTicketRequest {
        private String reason;
        
        @NotEmpty(message = "Danh sách sản phẩm không được để trống")
        @Valid
        private List<ExportItemRequest> items;

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public List<ExportItemRequest> getItems() {
            return items;
        }

        public void setItems(List<ExportItemRequest> items) {
            this.items = items;
        }
    }
    
    public static class ExportItemRequest {
        @NotNull(message = "Yêu cầu chọn thuốc")
        private Long medicineId;
        
        @NotNull(message = "Yêu cầu nhập số lượng")
        @Positive(message = "Số lượng phải lớn hơn 0")
        private Integer quantity;

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
    }

    public static class ChangeExportTicketStatusRequest {
        @NotNull(message = "Yêu cầu trạng thái mới")
        @Pattern(regexp = "PENDING|COMPLETED|CANCELLED", message = "Trạng thái không hợp lệ")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
