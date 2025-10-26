package com.appointmenthostpital.server.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

@Entity
@Table(name = "medicines")
public class MedicineModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @Column(nullable = false)
    private String unit;
    
    @Column(nullable = false)
    private Long price;
    
    private String manufacturer;
    
    @Column(columnDefinition = "enum('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK') default 'ACTIVE'")
    private String status = "ACTIVE";
    
    @Column(nullable = false)
    private Integer currentStock = 0; 
    
    @Column(nullable = false)
    private Integer minStock = 0;
    
    @Column(nullable = false)
    private Integer maxStock = 1000; 
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonBackReference
    private MedicineCategoryModel categoryModel;

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ImportTicketItemModel> importTicketItems = new ArrayList<>();

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ExportTicketItemModel> exportTicketItems = new ArrayList<>();

    @OneToMany(mappedBy = "medicineModel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PrescriptionInvoiceDetailModel> prescriptionInvoiceDetails = new ArrayList<>();

    public MedicineModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
    }

    public Integer getMinStock() {
        return minStock;
    }

    public void setMinStock(Integer minStock) {
        this.minStock = minStock;
    }

    public Integer getMaxStock() {
        return maxStock;
    }

    public void setMaxStock(Integer maxStock) {
        this.maxStock = maxStock;
    }

    public MedicineCategoryModel getCategoryModel() {
        return categoryModel;
    }

    public void setCategoryModel(MedicineCategoryModel categoryModel) {
        this.categoryModel = categoryModel;
    }

    public List<ImportTicketItemModel> getImportTicketItems() {
        return importTicketItems;
    }

    public void setImportTicketItems(List<ImportTicketItemModel> importTicketItems) {
        this.importTicketItems = importTicketItems;
    }

    public List<ExportTicketItemModel> getExportTicketItems() {
        return exportTicketItems;
    }

    public void setExportTicketItems(List<ExportTicketItemModel> exportTicketItems) {
        this.exportTicketItems = exportTicketItems;
    }

    public List<PrescriptionInvoiceDetailModel> getPrescriptionInvoiceDetails() {
        return prescriptionInvoiceDetails;
    }

    public void setPrescriptionInvoiceDetails(List<PrescriptionInvoiceDetailModel> prescriptionInvoiceDetails) {
        this.prescriptionInvoiceDetails = prescriptionInvoiceDetails;
    }
}
