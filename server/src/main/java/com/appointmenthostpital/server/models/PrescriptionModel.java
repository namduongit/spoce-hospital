package com.appointmenthostpital.server.models;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

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
@Table(name = "prescriptions")
public class PrescriptionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long total;
    @Column(columnDefinition = "enum('PENDING', 'UNPAID', 'PAID', 'CANCELED') default 'PENDING'", nullable = false)
    private String status;
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp createAt;

    @OneToMany(mappedBy = "prescriptionModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<DetailModel> detailModels;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "doctor_id")
    private DoctorProfileModel doctorProfileModel;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private UserModel userModel;

    public PrescriptionModel() {
    }

    public PrescriptionModel(Long id, Long total, String status, Timestamp createAt, List<DetailModel> detailModels,
            DoctorProfileModel doctorProfileModel, UserModel userModel) {
        this.id = id;
        this.total = total;
        this.status = status;
        this.createAt = createAt;
        this.detailModels = detailModels;
        this.doctorProfileModel = doctorProfileModel;
        this.userModel = userModel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public List<DetailModel> getDetailModels() {
        return detailModels;
    }

    public void setDetailModels(List<DetailModel> detailModels) {
        this.detailModels = detailModels;
    }

    public DoctorProfileModel getDoctorProfileModel() {
        return doctorProfileModel;
    }

    public void setDoctorProfileModel(DoctorProfileModel doctorProfileModel) {
        this.doctorProfileModel = doctorProfileModel;
    }

    public UserModel getUserModel() {
        return userModel;
    }

    public void setUserModel(UserModel userModel) {
        this.userModel = userModel;
    }

    @Override
    public String toString() {
        return "PrescriptionModel [id=" + id + ", total=" + total + ", status=" + status + ", createAt=" + createAt
                + ", detailModels=" + detailModels + ", doctorProfileModel=" + doctorProfileModel + ", userModel="
                + userModel + "]";
    }
}
