package com.appointmenthostpital.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicines")
public class MedicineModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String description;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id")
    private CategoryModel categoryModel;

    @OneToMany(mappedBy = "medicineModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<UnitModel> medicineUnitModels;

    @OneToMany(mappedBy = "medicineModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetailModel> detailModels;

    public MedicineModel() {
    }

    public MedicineModel(Long id, String name, String description, CategoryModel categoryModel,
            List<UnitModel> medicineUnitModels, List<DetailModel> detailModels) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryModel = categoryModel;
        this.medicineUnitModels = medicineUnitModels;
        this.detailModels = detailModels;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryModel getCategoryModel() {
        return categoryModel;
    }

    public void setCategoryModel(CategoryModel categoryModel) {
        this.categoryModel = categoryModel;
    }

    public List<UnitModel> getMedicineUnitModels() {
        return medicineUnitModels;
    }

    public void setMedicineUnitModels(List<UnitModel> medicineUnitModels) {
        this.medicineUnitModels = medicineUnitModels;
    }

    public List<DetailModel> getDetailModels() {
        return detailModels;
    }

    public void setDetailModels(List<DetailModel> detailModels) {
        this.detailModels = detailModels;
    }

    @Override
    public String toString() {
        return "MedicineModel [id=" + id + ", name=" + name + ", description=" + description + ", categoryModel="
                + categoryModel + ", medicineUnitModels=" + medicineUnitModels + ", detailModels=" + detailModels + "]";
    }
}
