package com.appointmenthostpital.server.models;

public class MedicineReportModel {
    private String medicineName;
    private int quantity;
    private Long price;
    private Long totalPrice;

    public MedicineReportModel() {
    }

    public MedicineReportModel(String medicineName, int quantity, Long price, Long totalPrice) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;
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

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }
}