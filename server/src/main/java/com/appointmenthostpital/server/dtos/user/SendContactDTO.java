package com.appointmenthostpital.server.dtos.user;

import jakarta.validation.constraints.NotNull;

public class SendContactDTO {
    @NotNull(message = "Yêu cầu nhập họ và tên")
    private String fullName;
    @NotNull(message = "Yêu cầu nhập số điện thoại")
    private String phone;
    @NotNull(message = "Yêu cầu nhập email")
    private String email;
    @NotNull(message = "Yêu cầu nhâp chủ đề")
    private String subject;
    @NotNull(message = "Yêu cầu nhập tin nhắn")
    private String message;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
