package com.appointmenthostpital.server.models;

public class MedicineExportModel {
    private Long id;
    private String medicineName;
    private int quantity;

    public MedicineExportModel() {
    }

    public MedicineExportModel(Long id ,String medicineName, int quantity) {
        this.id = id;
        this.medicineName = medicineName;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
