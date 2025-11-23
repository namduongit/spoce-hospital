package com.appointmenthostpital.server.services;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.models.ExportTicketItemModel;
import com.appointmenthostpital.server.models.ExportTicketModel;
import com.appointmenthostpital.server.models.ImportTicketItemModel;
import com.appointmenthostpital.server.models.ImportTicketModel;
import com.appointmenthostpital.server.models.MedicineReportModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceDetailModel;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.models.ServiceInvoiceDetailModel;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;
import com.appointmenthostpital.server.models.ServicePrescriptionModel;
import com.appointmenthostpital.server.models.MedicineExportModel;
import com.appointmenthostpital.server.models.MedicinePrescriptionModel;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportService {

    @Autowired
    ImportTicketService importTicketService;

    @Autowired
    ExportTicketService exportTicketService;

    @Autowired
    PrescriptionInvoiceService prescriptionInvoiceService;

    @Autowired
    ServiceInvoiceService serviceInvoiceService;

    public byte[] printMedicineReport(Long id) throws JRException {
        InputStream templateStream = getClass().getResourceAsStream("/jasperreports/medicineTemplate.jrxml");
        PrescriptionInvoiceModel pres = prescriptionInvoiceService.getPrescriptionInvoiceById(id);
        
        if (templateStream == null) {
            throw new JRException("Không tìm thấy template.jrxml");
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

        Map<String, Object> params = new HashMap<>();
        params.put("name", pres.getPatientName() );
        String doctorName = pres.getDoctorAccountModel() != null ?
            pres.getDoctorAccountModel().getDoctorProfileModel() != null ? pres.getDoctorAccountModel().getDoctorProfileModel().getFullName() : "Chưa cập nhật tên" : "Tài khoản không phải bác sĩ hoặc đã bị xóa";

        params.put("doctorName", doctorName);
        params.put("symptom", pres.getSymptoms());
        params.put("total", pres.getTotalAmount());

        List<MedicinePrescriptionModel> prescriptions = new ArrayList<>();
        prescriptions.add(new MedicinePrescriptionModel());
        for (PrescriptionInvoiceDetailModel model : pres.getPrescriptionInvoiceDetails()) {
            prescriptions.add(new MedicinePrescriptionModel(model.getMedicineModel().getName(), model.getQuantity(), model.getDosage()));
        }

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(prescriptions);
        params.put("Dataset1", dataSource);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] printServiceReport(Long id) throws JRException {
        InputStream templateStream = getClass().getResourceAsStream("/jasperreports/serviceTemplate.jrxml");
        ServiceInvoiceModel pres = serviceInvoiceService.getServiceInvoiceById(id);
        
        if (templateStream == null) {
            throw new JRException("Không tìm thấy template.jrxml");
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

        Map<String, Object> params = new HashMap<>();
        params.put("name", pres.getPatientName());
        String doctorName = pres.getDoctorAccountModel() != null ?
            pres.getDoctorAccountModel().getDoctorProfileModel() != null ? pres.getDoctorAccountModel().getDoctorProfileModel().getFullName() : "Chưa cập nhật tên" : "Tài khoản không phải bác sĩ hoặc đã bị xóa";

        params.put("doctorName", doctorName);
        params.put("total", pres.getTotalAmount());

        List<ServicePrescriptionModel> prescriptions = new ArrayList<>();
        prescriptions.add(new ServicePrescriptionModel());
        for (ServiceInvoiceDetailModel model : pres.getServiceInvoiceDetails()) {
            prescriptions.add(new ServicePrescriptionModel(model.getMedicalPackageModel().getName(), model.getQuantity(), model.getMedicalPackageModel().getPrice()));
        }

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(prescriptions);
        params.put("Dataset1", dataSource);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] printExportTicket(Long ticketId) throws JRException {
        InputStream templateStream = getClass().getResourceAsStream("/jasperreports/exportTemplate.jrxml");
        ExportTicketModel ticketModel = exportTicketService.getExportTicketById(ticketId);

        if (templateStream == null) {
            throw new JRException("Không tìm thấy exportTemplate.jrxml");
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

        Map<String, Object> params = new HashMap<>();
        params.put("name", ticketModel.getPerformedBy().getEmail());
        params.put("reason", ticketModel.getReason());

        List<MedicineExportModel> list = new ArrayList<>();
        list.add(new MedicineExportModel());
        for (ExportTicketItemModel item : ticketModel.getItems()) {
            list.add(new MedicineExportModel(
                item.getId(),
                item.getMedicine().getName(),
                item.getQuantity())
            );
        }

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(list);
        params.put("Dataset1", dataSource);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] printImportTicket(Long ticketId) throws JRException {
        InputStream templateStream = getClass().getResourceAsStream("/jasperreports/importTemplate.jrxml");
        ImportTicketModel ticketModel = importTicketService.getImportTicketById(ticketId);

        if (templateStream == null) {
            throw new JRException("Không tìm thấy importTemplate.jrxml");
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

        Map<String, Object> params = new HashMap<>();
        params.put("name", ticketModel.getPerformedBy().getEmail());
        params.put("supplierName", ticketModel.getSupplierName());
        params.put("total", ticketModel.getTotalAmount());

        List<MedicineReportModel> list = new ArrayList<>();
        list.add(new MedicineReportModel());
        for (ImportTicketItemModel item : ticketModel.getItems()) {
            list.add(new MedicineReportModel(
                item.getMedicine().getName(), 
                item.getQuantity(), 
                item.getUnitPrice(), 
                item.getQuantity() * item.getUnitPrice())
            );
        }

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(list);
        params.put("Dataset1", dataSource);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
