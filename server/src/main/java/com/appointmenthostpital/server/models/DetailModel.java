package com.appointmenthostpital.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "details")
public class DetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "prescription_id")
    private PrescriptionModel prescriptionModel;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "medicine_id")
    private MedicineModel medicineModel;

    @Column(nullable = false)
    private Long quantity;
    @Column(nullable = false)
    private Long totalAmount;
    
    public DetailModel() {
    }

    public DetailModel(PrescriptionModel prescriptionModel, MedicineModel medicineModel, Long quantity,
            Long totalAmount) {
        this.prescriptionModel = prescriptionModel;
        this.medicineModel = medicineModel;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
    }

    public PrescriptionModel getPrescriptionModel() {
        return prescriptionModel;
    }

    public void setPrescriptionModel(PrescriptionModel prescriptionModel) {
        this.prescriptionModel = prescriptionModel;
    }

    public MedicineModel getMedicineModel() {
        return medicineModel;
    }

    public void setMedicineModel(MedicineModel medicineModel) {
        this.medicineModel = medicineModel;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public String toString() {
        return "DetailModel [prescriptionModel=" + prescriptionModel + ", medicineModel=" + medicineModel
                + ", quantity=" + quantity + ", totalAmount=" + totalAmount + "]";
    }
}
