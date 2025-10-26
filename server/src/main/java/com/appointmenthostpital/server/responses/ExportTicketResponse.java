package com.appointmenthostpital.server.responses;

import java.util.Date;
import java.util.List;

public class ExportTicketResponse {
    private Long id;
    private String reason;
    private String performedBy;
    private String status;
    private List<ExportTicketItemResponse> items;
    private Date createdAt;
    private Date updatedAt;

    public ExportTicketResponse() {
    }

    public ExportTicketResponse(Long id, String reason, String performedBy, 
                               String status, List<ExportTicketItemResponse> items, 
                               Date createdAt, Date updatedAt) {
        this.id = id;
        this.reason = reason;
        this.performedBy = performedBy;
        this.status = status;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<ExportTicketItemResponse> getItems() {
        return items;
    }

    public void setItems(List<ExportTicketItemResponse> items) {
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
