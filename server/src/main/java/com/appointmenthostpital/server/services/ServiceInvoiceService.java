package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appointmenthostpital.server.converts.ServiceInvoiceConvert;
import com.appointmenthostpital.server.dtos.doctor.DoctorServiceInvoiceDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.MedicalPackageModel;
import com.appointmenthostpital.server.models.ServiceInvoiceDetailModel;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;
import com.appointmenthostpital.server.repositories.ServiceInvoiceRepository;
import com.appointmenthostpital.server.responses.ServiceInvoiceResponse;

@Service
public class ServiceInvoiceService {
    @Autowired
    private ServiceInvoiceRepository serviceInvoiceRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private MedicalPackageService medicalPackageService;

    public ServiceInvoiceModel getServiceInvoiceById(Long id) {
        return serviceInvoiceRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy hóa đơn dịch vụ"));
    }

    public ServiceInvoiceModel save(ServiceInvoiceModel invoiceModel) {
        return this.serviceInvoiceRepository.save(invoiceModel);
    }

    public List<ServiceInvoiceResponse> handleGetServiceInvoiceList() {
        return this.serviceInvoiceRepository.findAll().stream().map(
            ServiceInvoiceConvert::convertToResponse
        ).toList();
    }

    public ServiceInvoiceResponse handleGetServiceInvoiceById(Long id) {
        ServiceInvoiceModel invoiceModel = this.getServiceInvoiceById(id);
        return ServiceInvoiceConvert.convertToResponse(invoiceModel);
    }

    public void handleDetailServiceInvoice(ServiceInvoiceModel invoiceModel,
    DoctorServiceInvoiceDTO.CreateServiceInvoiceRequest request) {
        List<ServiceInvoiceDetailModel> details = request.getMedicalPackages().stream().map(packageItem -> {
            ServiceInvoiceDetailModel detailModel = new ServiceInvoiceDetailModel();
            MedicalPackageModel medicalPackageModel = this.medicalPackageService.getMedicalPackageById(packageItem.getMedicalPackageId());
            detailModel.setMedicalPackageModel(medicalPackageModel);
            detailModel.setServiceInvoiceModel(invoiceModel);
            detailModel.setQuantity(1);
            return detailModel;
        }).toList();
        invoiceModel.setServiceInvoiceDetails(details);
        invoiceModel.setTotalAmount(details.stream().mapToLong(
            detail -> detail.getMedicalPackageModel().getPrice()
        ).sum());
    }

    public ServiceInvoiceResponse handleCreateServiceInvoice(Authentication authentication,
    DoctorServiceInvoiceDTO.CreateServiceInvoiceRequest request) {
        ServiceInvoiceModel invoiceModel = new ServiceInvoiceModel();
        invoiceModel.setDoctorAccountModel(this.accountService.getUserByEmail(authentication.getName()));
        if (request.getUserId() != null) {
            invoiceModel.setPatientAccountModel(accountService.getUserById(request.getUserId()));
        }
        ServiceInvoiceConvert.convertFromCreateRequest(invoiceModel, request);

        List<ServiceInvoiceDetailModel> details = request.getMedicalPackages().stream().map(packageItem -> {
            ServiceInvoiceDetailModel detailModel = new ServiceInvoiceDetailModel();
            MedicalPackageModel medicalPackageModel = this.medicalPackageService.getMedicalPackageById(packageItem.getMedicalPackageId());
            detailModel.setMedicalPackageModel(medicalPackageModel);
            detailModel.setServiceInvoiceModel(invoiceModel);
            detailModel.setQuantity(1);
            return detailModel;
        }).toList();

        invoiceModel.setServiceInvoiceDetails(details);
        invoiceModel.setTotalAmount(details.stream().mapToLong(
            detail -> detail.getMedicalPackageModel().getPrice()
        ).sum());
        return ServiceInvoiceConvert.convertToResponse(this.serviceInvoiceRepository.save(invoiceModel));
    }

    /** Change Status -> PAID or CANCELLED */
    @Transactional
    public ServiceInvoiceResponse handleUpdateServiceInvoiceStatus(
        Long id,
    DoctorServiceInvoiceDTO.ChangeServiceInvoiceStatusRequest request) {
        ServiceInvoiceModel invoiceModel = this.getServiceInvoiceById(id);
        if (invoiceModel.getStatus().equals("PAID") || invoiceModel.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Không thể thay đổi trạng thái của hóa đơn đã thanh toán hoặc hủy");
        }
        
        invoiceModel.setStatus(request.getStatus());
        invoiceModel = this.serviceInvoiceRepository.save(invoiceModel);

        return ServiceInvoiceConvert.convertToResponse(invoiceModel);
    }
}
