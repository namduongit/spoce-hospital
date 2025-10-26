package com.appointmenthostpital.server.responses;

import java.util.ArrayList;
import java.util.List;

public class PrescriptionInvoiceResponse {
    private Long id;
    private String patientName;
    private String patientPhone;

    private String symptoms;
    private String note;

    private Long totalAmount;
    private String status;

    private String createAt;
    private String updateAt;

    private Long patientId;
    private String patientEmail;

    private Long doctorId;
    private String doctorEmail;

    private List<PrescriptionItem> medicines = new ArrayList<>();

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

    public List<PrescriptionItem> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<PrescriptionItem> medicines) {
        this.medicines = medicines;
    }

    public static class PrescriptionItem {
        private Long medicineId;
        private String medicineName;
        private Integer quantity;
        private Long unitPrice;
        private Long totalPrice;

        private String dosage;
        private String usageInstructions;

        public Long getMedicineId() {
            return medicineId;
        }

        public void setMedicineId(Long medicineId) {
            this.medicineId = medicineId;
        }

        public String getMedicineName() {
            return medicineName;
        }

        public void setMedicineName(String medicineName) {
            this.medicineName = medicineName;
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

        public Long getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(Long totalPrice) {
            this.totalPrice = totalPrice;
        }

        public String getDosage() {
            return dosage;
        }

        public void setDosage(String dosage) {
            this.dosage = dosage;
        }

        public String getUsageInstructions() {
            return usageInstructions;
        }

        public void setUsageInstructions(String usageInstructions) {
            this.usageInstructions = usageInstructions;
        }
    }
}
