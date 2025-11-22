package com.appointmenthostpital.server.services;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import com.appointmenthostpital.server.dtos.user.SendContactDTO;
import com.appointmenthostpital.server.exceptions.LoadResourceException;
import com.appointmenthostpital.server.exceptions.MailException;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Value("${EMAIL_RECEIVE_CONTACT}")
    private String emailReceiveContact;

    @Autowired
    private JavaMailSender mailSender;

    public String getResetPasswordTemplateContent() throws LoadResourceException {
        try {
            ClassPathResource resource = new ClassPathResource("templates/reset-password.html");
            String content = StreamUtils.copyToString(
                    resource.getInputStream(),
                    StandardCharsets.UTF_8);
            return content;
        } catch (Exception exception) {
            throw new LoadResourceException(exception.getMessage());
        }
    }

    public String getSendContactTemplateContent() throws LoadResourceException {
        try {
            ClassPathResource resource = new ClassPathResource("templates/send-contact.html");
            String content = StreamUtils.copyToString(
                    resource.getInputStream(),
                    StandardCharsets.UTF_8);
            return content;
        } catch (Exception exception) {
            throw new LoadResourceException(exception.getMessage());
        }
    }

    public void sendEmailResetPassword(String email, String password) throws MailException {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String htmlContent = this.getResetPasswordTemplateContent();

            htmlContent = htmlContent.replace("{$email}", email);
            htmlContent = htmlContent.replace("{$password}", password);

            helper.setTo(email);
            helper.setSubject("Yêu cầu thay đổi mật khẩu");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception exception) {
            throw new MailException(exception.getMessage());
        }
    }

    public void sendEmailContact(SendContactDTO request) throws MailException {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String htmlContent = this.getSendContactTemplateContent();

            htmlContent = htmlContent.replace("{$fullName}", request.getFullName());
            htmlContent = htmlContent.replace("{$email}", request.getEmail());
            htmlContent = htmlContent.replace("{$phone}", request.getPhone());
            htmlContent = htmlContent.replace("{$subject}", request.getSubject());
            htmlContent = htmlContent.replace("{$message}", request.getMessage());

            helper.setTo(this.emailReceiveContact);
            helper.setSubject("Nhận phản hồi liên lạc từ người dùng");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception exception) {
            throw new MailException(exception.getMessage());
        }
    }
}