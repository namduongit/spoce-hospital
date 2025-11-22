package com.appointmenthostpital.server.utils;

public class RabbitMQ {
    public static final String MAIN_EXCHANGE = "appointment-hospital-exchange";
    public static final String SEND_EMAIL_EXCHANGE = "send-email-exchange";
    public static final String UPLOAD_DOCTOR_EXCHANGE = "upload-doctor-exchange";
    public static final String REMOVE_DOCTOR_EXCHANGE = "remove-doctor-exchange";
    
    public static final String UPLOAD_DOCTOR_QUEUE = "upload-doctor-queue";
    public static final String UPLOAD_DOCTOR_ROUTING_KEY = "upload-doctor-routing-key";

    public static final String REMOVE_DOCTOR_QUEUE = "remove-doctor-queue";
    public static final String REMOVE_DOCTOR_ROUTING_KEY = "remove-doctor-routing-key";

    public static final String RESET_PASSWORD_QUEUE = "reset-password-queue";
    public static final String EMAIL_CONTACT_QUEUE = "email-contact-queue";
    public static final String SEND_EMAIL_ROUTING_KEY = "send-email-routing-key";
}
