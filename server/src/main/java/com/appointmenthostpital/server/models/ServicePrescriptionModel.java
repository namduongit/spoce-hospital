package com.appointmenthostpital.server.models;

public class ServicePrescriptionModel {
    private String medicineName;
    private int quantity;
    private Long price;

    public ServicePrescriptionModel() {
    }

    public ServicePrescriptionModel(String medicineName, int quantity, Long price) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.price = price;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
