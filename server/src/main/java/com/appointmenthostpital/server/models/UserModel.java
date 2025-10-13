package com.appointmenthostpital.server.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "enum('USER', 'ASSISTOR', 'DOCTOR', 'ADMIN') default 'USER'", nullable = false)
    private String role = "USER";
    @Column(columnDefinition = "enum('ACCOUNT', 'GOOGLE') default 'ACCOUNT'", nullable = false)
    private String type = "ACCOUNT";
    @Column(columnDefinition = "enum('ACTIVE', 'INACTIVE') default 'ACTIVE'", nullable = false)
    private String status = "ACTIVE";

    @OneToOne(mappedBy = "userModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private UserProfileModel userProfileModel;

    @OneToOne(mappedBy = "userModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private DoctorProfileModel doctorProfileModel;

    @OneToMany(mappedBy = "userModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AppointmentModel> userAppointments = new ArrayList<>();

    @OneToMany(mappedBy = "doctorModel")
    @JsonManagedReference
    private List<AppointmentModel> doctorAppointments = new ArrayList<>();

    public UserModel() {
    }

    public UserModel(Long id, String email, String password, String role, String type, String status,
            UserProfileModel userProfileModel, DoctorProfileModel doctorProfileModel,
            List<AppointmentModel> userAppointmets, List<AppointmentModel> doctorAppointments) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.type = type;
        this.status = status;
        this.userProfileModel = userProfileModel;
        this.doctorProfileModel = doctorProfileModel;
        this.userAppointments = userAppointmets;
        this.doctorAppointments = doctorAppointments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserProfileModel getUserProfileModel() {
        return userProfileModel;
    }

    public void setUserProfileModel(UserProfileModel userProfileModel) {
        this.userProfileModel = userProfileModel;
    }

    public DoctorProfileModel getDoctorProfileModel() {
        return doctorProfileModel;
    }

    public void setDoctorProfileModel(DoctorProfileModel doctorProfileModel) {
        this.doctorProfileModel = doctorProfileModel;
    }

    public List<AppointmentModel> getUserAppointments() {
        return userAppointments;
    }

    public void setUserAppointments(List<AppointmentModel> userAppointments) {
        this.userAppointments = userAppointments;
    }

    public List<AppointmentModel> getDoctorAppointments() {
        return doctorAppointments;
    }

    public void setDoctorAppointments(List<AppointmentModel> doctorAppointments) {
        this.doctorAppointments = doctorAppointments;
    }

    @Override
    public String toString() {
        return "UserModel [id=" + id + ", email=" + email + ", password=" + password + ", role=" + role + ", type="
                + type + ", status=" + status + ", userProfileModel=" + userProfileModel + ", doctorProfileModel="
                + doctorProfileModel + ", userAppointmets=" + userAppointments + ", doctorAppointments="
                + doctorAppointments + "]";
    }
}
