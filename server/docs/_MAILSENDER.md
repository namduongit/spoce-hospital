*Note*: Configuration and usage of Spring Mail Sender for email services.

### Define Mail Config
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username={your-email@gmail.com}
spring.mail.password={your-app-password}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```
- `smtp.gmail.com`: Gmail SMTP server.
- `Port 587`: Standard port for TLS/STARTTLS.
- `username`: Your Gmail address.
- `password`: Use App Password (not your regular Gmail password).
- `starttls.enable=true`: Enables encryption for secure email transmission.

---
### Mail Service Implementation
```java
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("noreply@hospital.com");
        
        mailSender.send(message);
    }
}
```

---
### Sending HTML Email
```java
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // true = HTML content
        helper.setFrom("noreply@hospital.com");
        
        mailSender.send(message);
    }
}
```

---
### Sending Email with Attachment
```java
public void sendEmailWithAttachment(String to, String subject, String body, File attachment) 
        throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);
    
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(body);
    helper.setFrom("noreply@hospital.com");
    helper.addAttachment(attachment.getName(), attachment);
    
    mailSender.send(message);
}
```

---
### Common Use Cases
**1. Appointment Confirmation**
```java
public void sendAppointmentConfirmation(String email, String patientName, String appointmentDate) {
    String subject = "Appointment Confirmation";
    String body = String.format(
        "Dear %s,\n\nYour appointment has been scheduled for %s.\n\nThank you!",
        patientName, appointmentDate
    );
    sendEmail(email, subject, body);
}
```

**2. Password Reset**
```java
public void sendPasswordReset(String email, String resetToken) {
    String subject = "Password Reset Request";
    String body = String.format(
        "Click the link to reset your password:\nhttp://hospital.com/reset?token=%s",
        resetToken
    );
    sendEmail(email, subject, body);
}
```

---
### Troubleshooting
- **Authentication failed**: Enable "Less secure app access" or use App Password in Gmail settings.
- **Connection timeout**: Check firewall settings, ensure port 587 is open.
- **SSL errors**: Verify `starttls.enable=true` is set correctly.
