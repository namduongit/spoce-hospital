package com.appointmenthostpital.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.dtos.doctor.DoctorPrescriptionInvoiceDTO;
import com.appointmenthostpital.server.dtos.doctor.DoctorServiceInvoiceDTO;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;

@Service
public class InvoiceService {
    public static class InvoicePayment {
        private Object invoice;
        private String directUrl;

        public Object getInvoice() {
            return invoice;
        }

        public void setInvoice(Object invoice) {
            this.invoice = invoice;
        }

        public String getDirectUrl() {
            return directUrl;
        }

        public void setDirectUrl(String directUrl) {
            this.directUrl = directUrl;
        }
    }

    @Autowired
    private ServiceInvoiceService serviceInvoiceService;

    @Autowired
    private PrescriptionInvoiceService prescriptionInvoiceService;

    @Autowired
    private AccountService accountService;

    public InvoicePayment handlePaymentSuccess(PaymentSend order, Authentication authentication) {
        String orderRequestType = order.getOrderType();
        if (orderRequestType.equals("SERVICE INVOICE")) {
            ServiceInvoiceModel invoice = serviceInvoiceService.getServiceInvoiceById(order.getOrderId());
            DoctorServiceInvoiceDTO.ChangeServiceInvoiceStatusRequest request = new DoctorServiceInvoiceDTO
            .ChangeServiceInvoiceStatusRequest();
            request.setStatus("PAID");

            InvoicePayment result = new InvoicePayment();
            result.setInvoice(serviceInvoiceService.handleUpdateServiceInvoiceStatus(invoice.getId(), request));
            result.setDirectUrl(this.getDirectUrl(authentication, orderRequestType));
            return result;

        } else if (orderRequestType.equals("PRESCRIPTION INVOICE")) {
            PrescriptionInvoiceModel invoice = prescriptionInvoiceService
                    .getPrescriptionInvoiceById(order.getOrderId());
            DoctorPrescriptionInvoiceDTO.ChangePrescriptionInvoiceStatusRequest request = new DoctorPrescriptionInvoiceDTO
            .ChangePrescriptionInvoiceStatusRequest();
            request.setStatus("PAID");

            InvoicePayment result = new InvoicePayment();
            result.setInvoice(prescriptionInvoiceService.handleUpdatePrescriptionInvoiceStatus(invoice.getId(), request));
            result.setDirectUrl(this.getDirectUrl(authentication, orderRequestType));
            return result;

        } else {
            throw new IllegalArgumentException("Lỗi tạo hóa đơn do sai loại");
        }
    }

    public String getDirectUrl(Authentication authentication, String orderType) {
        if (authentication == null) return "/";

        String email = authentication.getName();
        AccountModel accountModel = accountService.getUserByEmail(email);

        return accountModel.getRole().equals("ADMIN") ? "/admin" + "/" + orderType.toLowerCase().replace(" ", "-")
                : accountModel.getRole().equals("ASSISTOR")
                        ? "/assistor" + "/" + orderType.toLowerCase().replace(" ", "-")
                        : "/";
    }
}
