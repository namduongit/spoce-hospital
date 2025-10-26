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
@Table(name = "prescription_invoice_details")
public class PrescriptionInvoiceDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prescription_invoice_id", nullable = false)
    @JsonBackReference
    private PrescriptionInvoiceModel prescriptionInvoiceModel;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    @JsonBackReference
    private MedicineModel medicineModel;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "dosage")
    private String dosage; 

    @Column(columnDefinition = "TEXT")
    private String usageInstructions;

    public PrescriptionInvoiceDetailModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PrescriptionInvoiceModel getPrescriptionInvoiceModel() {
        return prescriptionInvoiceModel;
    }

    public void setPrescriptionInvoiceModel(PrescriptionInvoiceModel prescriptionInvoiceModel) {
        this.prescriptionInvoiceModel = prescriptionInvoiceModel;
    }

    public MedicineModel getMedicineModel() {
        return medicineModel;
    }

    public void setMedicineModel(MedicineModel medicineModel) {
        this.medicineModel = medicineModel;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
