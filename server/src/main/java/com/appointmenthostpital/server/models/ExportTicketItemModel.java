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
@Table(name = "export_ticket_items")
public class ExportTicketItemModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "export_ticket_id", nullable = false)
    @JsonBackReference
    private ExportTicketModel exportTicket;
    
    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    @JsonBackReference
    private MedicineModel medicine;
    
    @Column(nullable = false)
    private Integer quantity;

    public ExportTicketItemModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExportTicketModel getExportTicket() {
        return exportTicket;
    }

    public void setExportTicket(ExportTicketModel exportTicket) {
        this.exportTicket = exportTicket;
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
}
