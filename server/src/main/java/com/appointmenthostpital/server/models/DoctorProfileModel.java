package com.appointmenthostpital.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctor_profiles")
public class DoctorProfileModel {
    @Id
    private Long id;
    private String image;
    private String fullName;
    @Column(columnDefinition = "enum ('MALE', 'FEMALE', 'OTHER') default 'OTHER'")
    private String gender = "OTHER";
    private String phone;
    private String birthDate;
    private String degree;
    private String workDay;
    @Column(columnDefinition = "enum ('AVAILABLE', 'BUSY', 'OFFLINE') default 'AVAILABLE'")
    private String status = "AVAILABLE";

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserModel userModel;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private DepartmentModel departmentModel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getWorkDay() {
        return workDay;
    }

    public void setWorkDay(String workDay) {
        this.workDay = workDay;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserModel getUserModel() {
        return userModel;
    }

    public void setUserModel(UserModel userModel) {
        this.userModel = userModel;
    }

    public DepartmentModel getDepartmentModel() {
        return departmentModel;
    }

    public void setDepartmentModel(DepartmentModel departmentModel) {
        this.departmentModel = departmentModel;
    }

    @Override
    public String toString() {
        return "DoctorProfileModel [id=" + id + ", image=" + image + ", fullName=" + fullName + ", gender=" + gender
                + ", phone=" + phone + ", birthDate=" + birthDate + ", degree=" + degree + ", workDay=" + workDay
                + ", status=" + status + ", userModel=" + userModel + ", departmentModel=" + departmentModel + "]";
    }
}
