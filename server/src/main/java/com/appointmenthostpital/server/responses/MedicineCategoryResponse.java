package com.appointmenthostpital.server.responses;

public class MedicineCategoryResponse {
    private Long id;
    private String name;
    private String description;
    private Integer medicineCount;

    public MedicineCategoryResponse() {
    }

    public MedicineCategoryResponse(Long id, String name, String description, Integer medicineCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.medicineCount = medicineCount;
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

    public Integer getMedicineCount() {
        return medicineCount;
    }

    public void setMedicineCount(Integer medicineCount) {
        this.medicineCount = medicineCount;
    }
}
