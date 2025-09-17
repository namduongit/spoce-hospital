package com.appointmenthostpital.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
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
    private String name;
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private DepartmentModel departmentModel;

    @OneToMany(mappedBy = "roomModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AppointmentModel> appointmentModels;

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

    @Override
    public String toString() {
        return "RoomModel [id=" + id + ", name=" + name + ", status=" + status + ", departmentModel=" + departmentModel
                + ", appointmentModels=" + appointmentModels + "]";
    }
}
