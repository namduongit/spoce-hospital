package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.services.ReportService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/api/report")
public class PrintReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/import/{id}")
    public ResponseEntity<byte[]> printImportTicket(@PathVariable Long id) {
        byte[] pdf;
        try {
            pdf = reportService.printImportTicket(id);
        } catch (JRException e) {
            return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(null);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "import_ticket_" + id + ".pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdf);
    }

    @GetMapping("/export/{id}")
    public ResponseEntity<byte[]> printExportTicket(@PathVariable Long id) {
        try {
            byte[] pdf = reportService.printExportTicket(id);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", "export_ticket_" + id + ".pdf");

            return ResponseEntity.ok().headers(headers).body(pdf);
        } catch (JRException e) {
            return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/prescription/{id}")
    public ResponseEntity<byte[]> printPrescriptionTicket(@PathVariable Long id) {
        try {
            byte[] pdf = reportService.printMedicineReport(id);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", "prescription_ticket_" + id + ".pdf");

            return ResponseEntity.ok().headers(headers).body(pdf);
        } catch (JRException e) {
            return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/service/{id}")
    public ResponseEntity<byte[]> printServiceTicket(@PathVariable Long id) {
        try {
            byte[] pdf = reportService.printServiceReport(id);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", "service_ticket_" + id + ".pdf");

            return ResponseEntity.ok().headers(headers).body(pdf);
        } catch (JRException e) {
            return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(null);
        }
    }
}
