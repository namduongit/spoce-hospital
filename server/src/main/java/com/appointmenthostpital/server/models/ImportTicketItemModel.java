package com.appointmenthostpital.server.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "import_ticket_items")
public class ImportTicketItemModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "import_ticket_id", nullable = false)
    @JsonBackReference
    private ImportTicketModel importTicket;
    
    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    @JsonBackReference
    private MedicineModel medicine;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private Long unitPrice;
    
    @Temporal(TemporalType.DATE)
    private Date expiryDate;

    public ImportTicketItemModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ImportTicketModel getImportTicket() {
        return importTicket;
    }

    public void setImportTicket(ImportTicketModel importTicket) {
        this.importTicket = importTicket;
    }

    public MedicineModel getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineModel medicine) {
        this.medicine = medicine;
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

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
