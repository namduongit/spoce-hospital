package com.appointmenthostpital.server.models;

import java.sql.Timestamp;
import java.util.ArrayList;
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
@Table(name = "service_invoices")
public class ServiceInvoiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String patientPhone;

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

    @OneToMany(mappedBy = "serviceInvoiceModel",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ServiceInvoiceDetailModel> serviceInvoiceDetails = new ArrayList<>();


    private String vnpayRef;

    private String momoRef;

    public ServiceInvoiceModel() {
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

    public List<ServiceInvoiceDetailModel> getServiceInvoiceDetails() {
        return serviceInvoiceDetails;
    }

    public void setServiceInvoiceDetails(List<ServiceInvoiceDetailModel> serviceInvoiceDetails) {
        this.serviceInvoiceDetails = serviceInvoiceDetails;
    }

    public String getVnpayRef() {
        return vnpayRef;
    }

    public void setVnpayRef(String vnpayRef) {
        this.vnpayRef = vnpayRef;
    }

    public String getMomoRef() {
        return momoRef;
    }

    public void setMomoRef(String momoRef) {
        this.momoRef = momoRef;
    }
}
