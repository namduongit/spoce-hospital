package com.appointmenthostpital.server.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.appointmenthostpital.server.dtos.UploadFile;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.services.DoctorService;
import com.appointmenthostpital.server.services.FirebaseStorageService;
import com.appointmenthostpital.server.utils.RabbitMQ;

@Component
public class DoctorConsumer {
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private FirebaseStorageService firebaseStorageService;

    @RabbitListener(queues = RabbitMQ.UPLOAD_DOCTOR_QUEUE)
    public void uploadDoctorImage(UploadFile.UploadDoctorImage uploadDoctorImage) {
        DoctorProfileModel doctorProfileModel = this.doctorService.getDoctorById(uploadDoctorImage.getId());
        System.out.println("Upload image into Firebase service");
        String imageUrl = this.firebaseStorageService.uploadImage(uploadDoctorImage.getFile(), uploadDoctorImage.getContentType());
        System.out.println("Upload success, image url: "+ imageUrl);
        doctorProfileModel.setImage(imageUrl);
        System.out.println("Update doctor with email: "+ doctorProfileModel.getAccountModel().getEmail() +" with image url: "+ imageUrl);
        this.doctorService.save(doctorProfileModel);
        System.out.println("RabbitMQ has processed successfully");
    }

    @RabbitListener(queues = RabbitMQ.REMOVE_DOCTOR_QUEUE)
    public void removeDoctorImage(String imageUrl) {
        System.out.println("Delete image url: "+ imageUrl);
        this.firebaseStorageService.removeImage(imageUrl);
        System.out.println("RabbitMQ has processed successfully");
    }
}
