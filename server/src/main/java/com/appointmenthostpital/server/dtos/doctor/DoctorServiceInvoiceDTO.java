package com.appointmenthostpital.server.dtos.doctor;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class DoctorServiceInvoiceDTO {
    public static class CreateServiceInvoiceRequest {
        private Long userId;

        @NotNull(message = "Không được để trống tên bệnh nhân")
        private String patientName = "Không có tên";
        @NotNull(message = "Không được để trống số điện thoại bệnh nhân")
        private String patientPhone = "Không có số điện thoại";

        @NotNull(message = "Danh sách gói dịch vụ không được để trống")
        @Size(min = 1, message = "Danh sách gói dịch vụ phải có ít nhất 1 gói dịch vụ")
        private List<ServiceItemRequest> medicalPackages = new ArrayList<>();

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

        public List<ServiceItemRequest> getMedicalPackages() {
            return medicalPackages;
        }

        public void setMedicalPackages(List<ServiceItemRequest> medicalPackages) {
            this.medicalPackages = medicalPackages;
        }
    }

    public static class ServiceItemRequest {
        @NotNull(message = "Yêu cầu chọn gói dịch vụ")
        private Long medicalPackageId;

        public Long getMedicalPackageId() {
            return medicalPackageId;
        }

        public void setMedicalPackageId(Long medicalPackageId) {
            this.medicalPackageId = medicalPackageId;
        }
    }

    public static class ChangeServiceInvoiceStatusRequest {
        @NotNull(message = "Trạng thái không được để trống")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
