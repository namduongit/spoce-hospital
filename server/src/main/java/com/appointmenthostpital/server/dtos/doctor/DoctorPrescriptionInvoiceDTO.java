package com.appointmenthostpital.server.dtos.doctor;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class DoctorPrescriptionInvoiceDTO {
    public static class CreatePrescriptionInvoiceRequest {
        private Long userId;

        @NotNull(message = "Không được để trống tên bệnh nhân")
        private String patientName = "Không có tên";
        @NotNull(message = "Không được để trống số điện thoại")
        private String patientPhone = "Không có số điện thoại";

        @NotNull(message = "Không được để trống triệu chứng")
        private String symptoms = "Không có triệu chứng";

        @NotNull(message = "Không được để trống ghi chú")
        private String note = "Không có ghi chú";

        @NotNull(message = "Danh sách thuốc không được để trống")
        @Size(min = 1, message = "Danh sách thuốc phải có ít nhất 1 thuốc")
        private List<PrescriptionItemRequest> medicines = new ArrayList<>();

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getPatientName() {
            return patientName;
        }

        public void setPatientName(String patientName) {
            this.patientName = patientName;
        }

        public String getPatientPhone() {
            return patientPhone;
        }

        public void setPatientPhone(String patientPhone) {
            this.patientPhone = patientPhone;
        }

        public String getSymptoms() {
            return symptoms;
        }

        public void setSymptoms(String symptoms) {
            this.symptoms = symptoms;
        }

        public String getNote() {
            return note;
        }

        public void setNote(String note) {
            this.note = note;
        }

        public List<PrescriptionItemRequest> getMedicines() {
            return medicines;
        }

        public void setMedicines(List<PrescriptionItemRequest> medicines) {
            this.medicines = medicines;
        }
    }

    public static class PrescriptionItemRequest {
        @NotNull(message = "Yêu cầu chọn thuốc")
        private Long medicineId;
        @NotNull(message = "Yêu cầu nhập số lượng")
        private Integer quantity;
        @NotNull(message = "Yêu cầu nhập hướng dẫn sử dụng")
        private String usageInstructions = "Không có hướng dẫn";
        @NotNull(message = "Yêu cầu nhập liều dùng")
        private String dosage = "Không có liều dùng";

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

        public String getUsageInstructions() {
            return usageInstructions;
        }

        public void setUsageInstructions(String usageInstructions) {
            this.usageInstructions = usageInstructions;
        }

        public String getDosage() {
            return dosage;
        }

        public void setDosage(String dosage) {
            this.dosage = dosage;
        }
    }

    public static class ChangePrescriptionInvoiceStatusRequest {
        @NotNull(message = "Yêu cầu nhập trạng thái")
        @Pattern(regexp = "^(PENDING|PAID|CANCELLED)$", message = "Trạng thái không hợp lệ")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
