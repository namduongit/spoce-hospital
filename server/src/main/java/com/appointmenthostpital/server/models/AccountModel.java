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
@Table(name = "accounts")
public class AccountModel {
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

    @OneToOne(mappedBy = "accountModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private UserProfileModel userProfileModel;

    @OneToOne(mappedBy = "accountModel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private DoctorProfileModel doctorProfileModel;

    @OneToMany(mappedBy = "accountModel")
    @JsonManagedReference
    private List<AppointmentModel> userAppointments = new ArrayList<>();

    @OneToMany(mappedBy = "doctorModel")
    @JsonManagedReference
    private List<AppointmentModel> doctorAppointments = new ArrayList<>();

    @OneToMany(mappedBy = "performedBy")
    @JsonManagedReference
    private List<ImportTicketModel> importTickets = new ArrayList<>();

    @OneToMany(mappedBy = "performedBy")
    @JsonManagedReference
    private List<ExportTicketModel> exportTickets = new ArrayList<>();

    @OneToMany(mappedBy = "patientAccountModel")
    @JsonManagedReference
    private List<ServiceInvoiceModel> patientServiceInvoices = new ArrayList<>();

    @OneToMany(mappedBy = "doctorAccountModel")
    @JsonManagedReference
    private List<ServiceInvoiceModel> doctorServiceInvoices = new ArrayList<>();

    @OneToMany(mappedBy = "patientAccountModel")
    @JsonManagedReference
    private List<PrescriptionInvoiceModel> patientPrescriptionInvoices = new ArrayList<>();

    @OneToMany(mappedBy = "doctorAccountModel")
    @JsonManagedReference
    private List<PrescriptionInvoiceModel> doctorPrescriptionInvoices = new ArrayList<>();  

    public AccountModel() {
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

    public List<ImportTicketModel> getImportTickets() {
        return importTickets;
    }

    public void setImportTickets(List<ImportTicketModel> importTickets) {
        this.importTickets = importTickets;
    }

    public List<ExportTicketModel> getExportTickets() {
        return exportTickets;
    }

    public void setExportTickets(List<ExportTicketModel> exportTickets) {
        this.exportTickets = exportTickets;
    }

    public List<ServiceInvoiceModel> getPatientServiceInvoices() {
        return patientServiceInvoices;
    }

    public void setPatientServiceInvoices(List<ServiceInvoiceModel> patientServiceInvoices) {
        this.patientServiceInvoices = patientServiceInvoices;
    }

    public List<ServiceInvoiceModel> getDoctorServiceInvoices() {
        return doctorServiceInvoices;
    }

    public void setDoctorServiceInvoices(List<ServiceInvoiceModel> doctorServiceInvoices) {
        this.doctorServiceInvoices = doctorServiceInvoices;
    }

    public List<PrescriptionInvoiceModel> getPatientPrescriptionInvoices() {
        return patientPrescriptionInvoices;
    }

    public void setPatientPrescriptionInvoices(List<PrescriptionInvoiceModel> patientPrescriptionInvoices) {
        this.patientPrescriptionInvoices = patientPrescriptionInvoices;
    }

    public List<PrescriptionInvoiceModel> getDoctorPrescriptionInvoices() {
        return doctorPrescriptionInvoices;
    }

    public void setDoctorPrescriptionInvoices(List<PrescriptionInvoiceModel> doctorPrescriptionInvoices) {
        this.doctorPrescriptionInvoices = doctorPrescriptionInvoices;
    }
}
