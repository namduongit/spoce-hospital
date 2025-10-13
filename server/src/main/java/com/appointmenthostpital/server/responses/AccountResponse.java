package com.appointmenthostpital.server.responses;

import java.util.List;

public class AccountResponse {
    private Long id;
    private String email;
    private String role;
    private String type;
    private String status;

    private DetailResponse.ProfileDetail profileDetail;
    private List<DetailResponse.AppointmentDetail> appointmentDetails;
    
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

    public DetailResponse.ProfileDetail getProfileDetail() {
        return profileDetail;
    }

    public void setProfileDetail(DetailResponse.ProfileDetail profileDetail) {
        this.profileDetail = profileDetail;
    }

    public List<DetailResponse.AppointmentDetail> getAppointmentDetails() {
        return appointmentDetails;
    }

    public void setAppointmentDetails(List<DetailResponse.AppointmentDetail> appointmentDetails) {
        this.appointmentDetails = appointmentDetails;
    }
}
