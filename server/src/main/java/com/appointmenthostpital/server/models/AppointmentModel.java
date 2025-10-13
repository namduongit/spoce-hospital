package com.appointmenthostpital.server.models;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class AppointmentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String time;
    private String note;
    @Column(columnDefinition = "enum('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED') default 'PENDING'")
    private String status = "PENDING";
    
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private UserModel userModel;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "department_id")
    private DepartmentModel departmentModel;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "room_id")
    private RoomModel roomModel;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "doctor_id")
    private UserModel doctorModel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
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

    public RoomModel getRoomModel() {
        return roomModel;
    }

    public void setRoomModel(RoomModel roomModel) {
        this.roomModel = roomModel;
    }

    public UserModel getDoctorModel() {
        return doctorModel;
    }

    public void setDoctorModel(UserModel doctorModel) {
        this.doctorModel = doctorModel;
    }

    @Override
    public String toString() {
        return "AppointmentModel [id=" + id + ", fullName=" + fullName + ", phone=" + phone + ", time=" + time
                + ", note=" + note + ", status=" + status + ", createdAt=" + createdAt + ", userModel=" + userModel
                + ", departmentModel=" + departmentModel + ", roomModel=" + roomModel + ", doctorModel=" + doctorModel
                + "]";
    }
}
