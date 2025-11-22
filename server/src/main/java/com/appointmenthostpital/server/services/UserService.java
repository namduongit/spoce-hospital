package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.appointmenthostpital.server.converts.AccountDetailConvert;
import com.appointmenthostpital.server.converts.AppointmentConvert;
import com.appointmenthostpital.server.converts.PrescriptionInvoiceConvert;
import com.appointmenthostpital.server.converts.ServiceInvoiceConvert;
import com.appointmenthostpital.server.dtos.user.SendContactDTO;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.repositories.UserRepository;
import com.appointmenthostpital.server.responses.AccountDetail;
import com.appointmenthostpital.server.responses.AppointmentResponse;
import com.appointmenthostpital.server.responses.PrescriptionInvoiceResponse;
import com.appointmenthostpital.server.responses.ServiceInvoiceResponse;
import com.appointmenthostpital.server.utils.RabbitMQ;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public AccountModel saveModel(AccountModel accountModel) {
        return this.userRepository.save(accountModel);
    }

    public AccountModel handleRegister(AccountModel accountModel) {
        return this.userRepository.save(accountModel);
    }

    public AccountModel handleLogin(String email) {
        AccountModel model = this.userRepository.findByEmail(email);
        if (model == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        return model; 
    }

    public AccountModel getUserByEmail(String email) {
        AccountModel model = this.userRepository.findByEmail(email);
        if (model == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        return model; 
    }

    public AccountDetail.ProfileDetailResponse handleGetAccountDetail(Authentication authentication) {
        String email = authentication.getName();
        AccountModel accountModel = this.getUserByEmail(email);
        return AccountDetailConvert.convertToProfileDetailResponse(accountModel);
    }

    public AccountDetail.ProfileDetailResponse handleUpdateProfile(Authentication authentication,
            UserUpdateDTO.UpdateProfileRequest request) {
        String email = authentication.getName();
        AccountModel accountModel = this.getUserByEmail(email);
        AccountDetailConvert.convertFromUpdateUserProfileRequest(accountModel, request);
        accountModel = this.userRepository.save(accountModel);
        return AccountDetailConvert.convertToProfileDetailResponse(accountModel);
    }

    public List<AppointmentResponse> handleGetAppointmentList(Authentication authentication) {
        String email = authentication.getName();
        AccountModel accountModel = this.getUserByEmail(email);
        return accountModel.getUserAppointments().stream().map(AppointmentConvert::convertToResponse).toList();
    }

    public AppointmentResponse handleCreateAppointment(Authentication authentication, UserAppointmentDTO.CreateAppointmentRequest request) {
        String email = authentication.getName();
        AccountModel accountModel = this.getUserByEmail(email);
        AppointmentModel appointmentModel = new AppointmentModel();
        AppointmentConvert.convertFromCreateByUserRequest(appointmentModel, request);
        appointmentModel.setAccountModel(accountModel);
        appointmentModel = this.appointmentService.createAppointment(appointmentModel);
        return AppointmentConvert.convertToResponse(appointmentModel);
    }

    public List<ServiceInvoiceResponse> handleGetServiceInvoiceList(Authentication authentication) {
        String email = authentication.getName();
        AccountModel accountModel = this.getUserByEmail(email);
        return  accountModel.getPatientServiceInvoices().stream()
                .map(ServiceInvoiceConvert::convertToResponse)
                .toList();  
    }

    public List<PrescriptionInvoiceResponse> handleGetPrescriptionInvoiceList(Authentication authentication) {
        String email = authentication.getName();
        AccountModel accountModel = this.getUserByEmail(email);
        return  accountModel.getPatientPrescriptionInvoices().stream()
                .map(PrescriptionInvoiceConvert::convertToResponse)
                .toList();  
    }

    public void handleSendContact(SendContactDTO request) {
        System.out.println("Send to exchange: "+ RabbitMQ.SEND_EMAIL_EXCHANGE);
        System.out.println("Send with routin key: "+ RabbitMQ.SEND_EMAIL_ROUTING_KEY +".contact."+ request.getEmail());
        this.rabbitTemplate.convertAndSend(RabbitMQ.SEND_EMAIL_EXCHANGE, RabbitMQ.SEND_EMAIL_ROUTING_KEY +".contact."+ request.getEmail(), request);
        System.out.println("Sent to RabbitMQ for processing");
    }
}
