package com.appointmenthostpital.server.dtos.user;

import java.util.List;

import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.models.UserProfileModel;

public class UserDetailDTO {
    private Long id;
    private String email;
    private String role;
    private String type;
    private String status;

    private UserProfileModel userProfileModel;
    private List<AppointmentModel> userAppointmets;

    public UserDetailDTO(Long id, String email, String role, String type, String status,
            UserProfileModel userProfileModel, List<AppointmentModel> userAppointmets) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.type = type;
        this.status = status;
        this.userProfileModel = userProfileModel;
        this.userAppointmets = userAppointmets;
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

    public List<AppointmentModel> getUserAppointmets() {
        return userAppointmets;
    }

    public void setUserAppointmets(List<AppointmentModel> userAppointmets) {
        this.userAppointmets = userAppointmets;
    }

    @Override
    public String toString() {
        return "AuthDetailDTO [id=" + id + ", email=" + email + ", role=" + role + ", type=" + type + ", status="
                + status + ", userProfileModel=" + userProfileModel + ", userAppointmets=" + userAppointmets + "]";
    }
}
