package com.appointmenthostpital.server.models;

public class MedicinePrescriptionModel {
    private String medicineName;
    private int quantity;
    private String dose;

    public MedicinePrescriptionModel() {
    }

    public MedicinePrescriptionModel(String medicineName, int quantity, String dose) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.dose = dose;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
