package com.appointmenthostpital.server.models;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "prescription_invoices")
public class PrescriptionInvoiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String patientPhone;
    
    private String symptoms;
    private String note;

    @ManyToOne
    @JoinColumn(name = "patient_account_id")
    private AccountModel patientAccountModel;

    @ManyToOne
    @JoinColumn(name = "doctor_account_id")
    private AccountModel doctorAccountModel;

    @Column(nullable = false)
    private Long totalAmount;

    @Column(columnDefinition = "enum('PENDING', 'PAID', 'CANCELLED')")
    private String status = "PENDING";

    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    
    @UpdateTimestamp
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "prescriptionInvoiceModel",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PrescriptionInvoiceDetailModel> prescriptionInvoiceDetails;

    public PrescriptionInvoiceModel() {
    }

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

    public AccountModel getPatientAccountModel() {
        return patientAccountModel;
    }

    public void setPatientAccountModel(AccountModel patientAccountModel) {
        this.patientAccountModel = patientAccountModel;
    }

    public AccountModel getDoctorAccountModel() {
        return doctorAccountModel;
    }

    public void setDoctorAccountModel(AccountModel doctorAccountModel) {
        this.doctorAccountModel = doctorAccountModel;
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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<PrescriptionInvoiceDetailModel> getPrescriptionInvoiceDetails() {
        return prescriptionInvoiceDetails;
    }

    public void setPrescriptionInvoiceDetails(List<PrescriptionInvoiceDetailModel> prescriptionInvoiceDetails) {
        this.prescriptionInvoiceDetails = prescriptionInvoiceDetails;
    }
}
