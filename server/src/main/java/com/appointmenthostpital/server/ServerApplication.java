package com.appointmenthostpital.server;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.appointmenthostpital.server.services.ReportService;

import net.sf.jasperreports.engine.JRException;

@SpringBootApplication
public class ServerApplication {

	// @Autowired
	// private PrescriptionReportService prescriptionReportService;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	// @Override
	// public void run(String... args) throws Exception {
    //     // --- LOGIC TẠO BÁO CÁO TẠM THỜI ---
    //     try {
    //         byte[] pdfBytes = prescriptionReportService.generatePrescriptionReportPdf();

    //         // Lưu file PDF ra ổ đĩa
    //         Path path = Paths.get("temp_report.pdf");
    //         Files.write(path, pdfBytes);
    //         System.out.println("Báo cáo đã được lưu tại: " + path.toAbsolutePath());
    //     } catch (JRException | IOException e) {
    //         e.printStackTrace();
    //     }
    //     // --- KẾT THÚC LOGIC ---

    //     // Nếu bạn muốn ứng dụng tắt ngay sau khi tạo xong:
    //     // System.exit(0); 
    // }
}
