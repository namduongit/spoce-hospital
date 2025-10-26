package com.appointmenthostpital.server.responses;

import java.util.Date;
import java.util.List;

public class ImportTicketResponse {
    private Long id;
    private String supplierName;
    private String reason;
    private String performedBy;
    private String status;
    private List<ImportTicketItemResponse> items;
    private Date createdAt;
    private Date updatedAt;

    public ImportTicketResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ImportTicketItemResponse> getItems() {
        return items;
    }

    public void setItems(List<ImportTicketItemResponse> items) {
        this.items = items;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
