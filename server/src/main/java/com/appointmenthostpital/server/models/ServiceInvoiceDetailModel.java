package com.appointmenthostpital.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "service_invoice_details")
public class ServiceInvoiceDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_invoice_id")
    @JsonBackReference
    private ServiceInvoiceModel serviceInvoiceModel;

    @ManyToOne
    @JoinColumn(name = "medical_package_id")
    @JsonBackReference
    private MedicalPackageModel medicalPackageModel;

    private Integer quantity;

    public ServiceInvoiceDetailModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ServiceInvoiceModel getServiceInvoiceModel() {
        return serviceInvoiceModel;
    }

    public void setServiceInvoiceModel(ServiceInvoiceModel serviceInvoiceModel) {
        this.serviceInvoiceModel = serviceInvoiceModel;
    }

    public MedicalPackageModel getMedicalPackageModel() {
        return medicalPackageModel;
    }

    public void setMedicalPackageModel(MedicalPackageModel medicalPackageModel) {
        this.medicalPackageModel = medicalPackageModel;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
