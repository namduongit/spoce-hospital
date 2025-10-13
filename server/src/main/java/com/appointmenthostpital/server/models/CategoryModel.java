package com.appointmenthostpital.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class CategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    
    @OneToMany(mappedBy = "categoryModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MedicineModel> medicineModels;

    public CategoryModel() {
    }

    public CategoryModel(Long id, String name, List<MedicineModel> medicineModels) {
        this.id = id;
        this.name = name;
        this.medicineModels = medicineModels;
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

    public List<MedicineModel> getMedicineModels() {
        return medicineModels;
    }

    public void setMedicineModels(List<MedicineModel> medicineModels) {
        this.medicineModels = medicineModels;
    }

    @Override
    public String toString() {
        return "MedicineCategoryModel [id=" + id + ", name=" + name + ", medicineModels=" + medicineModels + "]";
    }
}
