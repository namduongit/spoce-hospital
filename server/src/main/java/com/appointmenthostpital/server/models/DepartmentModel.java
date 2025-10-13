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
@Table(name = "departments")
public class DepartmentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "departmentModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<RoomModel> roomModels;

    @OneToMany(mappedBy = "departmentModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DoctorProfileModel> doctorProfileModels;

    @OneToMany(mappedBy = "departmentModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AppointmentModel> appointmentModels;

    public DepartmentModel() {
    }

    public DepartmentModel(Long id, String name, List<RoomModel> roomModels,
            List<DoctorProfileModel> doctorProfileModels, List<AppointmentModel> appointmentModels) {
        this.id = id;
        this.name = name;
        this.roomModels = roomModels;
        this.doctorProfileModels = doctorProfileModels;
        this.appointmentModels = appointmentModels;
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

    public List<RoomModel> getRoomModels() {
        return roomModels;
    }

    public void setRoomModels(List<RoomModel> roomModels) {
        this.roomModels = roomModels;
    }

    public List<DoctorProfileModel> getDoctorProfileModels() {
        return doctorProfileModels;
    }

    public void setDoctorProfileModels(List<DoctorProfileModel> doctorProfileModels) {
        this.doctorProfileModels = doctorProfileModels;
    }

    public List<AppointmentModel> getAppointmentModels() {
        return appointmentModels;
    }

    public void setAppointmentModels(List<AppointmentModel> appointmentModels) {
        this.appointmentModels = appointmentModels;
    }

    @Override
    public String toString() {
        return "DepartmentModel [id=" + id + ", name=" + name + ", roomModels=" + roomModels + ", doctorProfileModels="
                + doctorProfileModels + ", appointmentModels=" + appointmentModels + "]";
    }
}
