package com.appointmenthostpital.server.responses;

import java.util.ArrayList;
import java.util.List;

public class ServiceInvoiceResponse {
    private Long id;
    private String patientName;
    private String patientPhone;

    private Long totalAmount;
    private String status;

    private String createAt;
    private String updateAt;

    private Long patientId;
    private String patientEmail;

    private Long doctorId;
    private String doctorEmail;

    private List<ServiceItem> medicalPackages = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }

    public String getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(String updateAt) {
        this.updateAt = updateAt;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public List<ServiceItem> getMedicalPackages() {
        return medicalPackages;
    }

    public void setMedicalPackages(List<ServiceItem> medicalPackages) {
        this.medicalPackages = medicalPackages;
    }

    public static class ServiceItem {
        private Long medicalPackageId;
        private String medicalPackageName;
        private Long price;

        public Long getMedicalPackageId() {
            return medicalPackageId;
        }

        public void setMedicalPackageId(Long medicalPackageId) {
            this.medicalPackageId = medicalPackageId;
        }

        public String getMedicalPackageName() {
            return medicalPackageName;
        }

        public void setMedicalPackageName(String medicalPackageName) {
            this.medicalPackageName = medicalPackageName;
        }

        public Long getPrice() {
            return price;
        }

        public void setPrice(Long price) {
            this.price = price;
        }
    }
}
