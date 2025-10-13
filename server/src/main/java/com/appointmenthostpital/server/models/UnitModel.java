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
@Table(name = "units")
public class UnitModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long price;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "medicine_id")
    private MedicineModel medicineModel;

    public UnitModel() {
    }

    public UnitModel(Long id, String name, Long price, MedicineModel medicineModel) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.medicineModel = medicineModel;
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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public MedicineModel getMedicineModel() {
        return medicineModel;
    }

    public void setMedicineModel(MedicineModel medicineModel) {
        this.medicineModel = medicineModel;
    }

    @Override
    public String toString() {
        return "MedicineUnitModel [id=" + id + ", name=" + name + ", price=" + price + ", medicineModel="
                + medicineModel + "]";
    }
}
