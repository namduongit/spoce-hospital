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
@Table(name = "rooms")
public class RoomModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "enum ('EMPTY', 'FULL', 'REPAIR') default 'EMPTY'", nullable = false)
    private String status = "EMPTY";
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private DepartmentModel departmentModel;

    @OneToMany(mappedBy = "roomModel", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AppointmentModel> appointmentModels;

    public RoomModel() {
    }

    public RoomModel(Long id, String name, String status, DepartmentModel departmentModel,
            List<AppointmentModel> appointmentModels) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.departmentModel = departmentModel;
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

    public DepartmentModel getDepartmentModel() {
        return departmentModel;
    }

    public void setDepartmentModel(DepartmentModel departmentModel) {
        this.departmentModel = departmentModel;
    }

    public List<AppointmentModel> getAppointmentModels() {
        return appointmentModels;
    }

    public void setAppointmentModels(List<AppointmentModel> appointmentModels) {
        this.appointmentModels = appointmentModels;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
