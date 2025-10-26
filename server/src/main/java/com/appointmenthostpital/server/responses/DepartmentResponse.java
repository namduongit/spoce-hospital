package com.appointmenthostpital.server.responses;

import java.util.List;

public class DepartmentResponse {
    private Long id;
    private String name;

    private List<RoomResponse> rooms;

    private List<DoctorResponse> doctors;

    private List<AppointmentResponse> appointments;

    public DepartmentResponse() {
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

    public List<RoomResponse> getRooms() {
        return rooms;
    }

    public void setRooms(List<RoomResponse> rooms) {
        this.rooms = rooms;
    }

    public List<DoctorResponse> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<DoctorResponse> doctors) {
        this.doctors = doctors;
    }

    public List<AppointmentResponse> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentResponse> appointments) {
        this.appointments = appointments;
    }
}
