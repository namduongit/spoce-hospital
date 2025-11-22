package com.appointmenthostpital.server.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.appointmenthostpital.server.dtos.user.ForgotPasswordDTO;
import com.appointmenthostpital.server.dtos.user.SendContactDTO;
import com.appointmenthostpital.server.exceptions.RabbitMQException;
import com.appointmenthostpital.server.services.EmailService;
import com.appointmenthostpital.server.utils.RabbitMQ;

@Component
public class EmailConsumer {
    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = RabbitMQ.RESET_PASSWORD_QUEUE)
    public void handleForgotPassword(ForgotPasswordDTO.SendNewPasswordRequest request) throws RabbitMQException {
        // Thread.sleep(20000);
        try {
            System.out.println("Send new password to email: "+ request.getEmail());
            emailService.sendEmailResetPassword(request.getEmail(), request.getNewPassword());
        } catch (Exception exception) {
            throw new RabbitMQException(exception.getMessage());
        } finally {
            System.out.println("RabbitMQ has processed successfully");
        }
    }

    @RabbitListener(queues = RabbitMQ.EMAIL_CONTACT_QUEUE)
    public void handleSendContact(SendContactDTO request) throws RabbitMQException {
        try {
            System.out.println("Send the customer's contact information");
            emailService.sendEmailContact(request);
        } catch (Exception exception) {
            throw new RabbitMQException(exception.getMessage());
        } finally {
            System.out.println("RabbitMQ has processed successfully");
        }
    }
}
