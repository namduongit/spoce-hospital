package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.appointmenthostpital.server.converts.AccountDetailConvert;
import com.appointmenthostpital.server.converts.DoctorConvert;
import com.appointmenthostpital.server.dtos.UploadFile;
import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.exceptions.UploadFileException;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.repositories.DoctorProfileRepository;
import com.appointmenthostpital.server.responses.AccountDetail;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.utils.RabbitMQ;
import com.appointmenthostpital.server.utils.ValidPassword;

@Service
public class DoctorService {
    @Autowired
    private DoctorProfileRepository doctorProfileRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public DoctorProfileModel save(DoctorProfileModel doctorProfileModel) {
        return this.doctorProfileRepository.save(doctorProfileModel);
    }

    public DoctorProfileModel getDoctorById(Long id) {
        return this.doctorProfileRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy bác sĩ"));
    }

    public List<DoctorResponse> handleGetDoctorList() {
        List<DoctorProfileModel> doctorProfileModels = this.doctorProfileRepository.findAll();
        return doctorProfileModels.stream().map(DoctorConvert::convertToResponse).toList();
    }

    public DoctorResponse handleCreateDoctor(AdminDoctorDTO.CreateDoctorRequest request) {
        if (!ValidPassword.comparePassword(request.getPassword(), request.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu xác nhận không khớp");
        }
        DoctorProfileModel doctorProfileModel = new DoctorProfileModel();
        AccountModel userModel = new AccountModel();
        userModel.setEmail(request.getEmail());
        userModel.setPassword(passwordEncoder.encode(request.getPassword()));
        userModel.setRole("DOCTOR");
        doctorProfileModel.setAccountModel(userModel);
        doctorProfileModel.setDepartmentModel(departmentService.getDepartmentById(request.getDepartmentId()));

        DoctorConvert.convertFromCreateRequest(doctorProfileModel, request);
        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);
        this.accountService.save(doctorProfileModel.getAccountModel());
        return DoctorConvert.convertToResponse(doctorProfileModel);
    }

    public DoctorResponse handleUpdateDoctor(Long id, AdminDoctorDTO.UpdateDoctorRequest request) {
        DoctorProfileModel doctorProfileModel = this.getDoctorById(id);
        doctorProfileModel.setDepartmentModel(departmentService.getDepartmentById(request.getDepartmentId()));

        DoctorConvert.convertFromUpdateRequest(doctorProfileModel, request);
        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);
        return DoctorConvert.convertToResponse(doctorProfileModel);
    }

    public DoctorResponse handleUpdateDoctorWorkDay(Long id, AdminDoctorDTO.UpdateDoctorWorkDayRequest request) {
        DoctorProfileModel doctorProfileModel = this.getDoctorById(id);

        DoctorConvert.convertFromUpdateWorkDayRequest(doctorProfileModel, request);
        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);
        return DoctorConvert.convertToResponse(doctorProfileModel);
    }

    public DoctorResponse handleUpdateDoctorImageAvatar(Long id, MultipartFile file) {
        if (file == null) throw new UploadFileException("Chưa có dữ liệu gửi lên");
        DoctorProfileModel doctorProfileModel = this.getDoctorById(id);

        // String imageUrl = firebaseStorageService.uploadImage(file);
        // doctorProfileModel.setImage(imageUrl);

        UploadFile.UploadDoctorImage uploadDoctorImage = new UploadFile.UploadDoctorImage();
        uploadDoctorImage.setId(id);
        try {
            uploadDoctorImage.setFile(file.getBytes());
            uploadDoctorImage.setContentType(file.getContentType());
        } catch (Exception exception) {
            throw new UploadFileException("Lỗi khi chuyển đổi ảnh");
        }
        this.rabbitTemplate.convertAndSend(RabbitMQ.UPLOAD_DOCTOR_EXCHANGE, RabbitMQ.UPLOAD_DOCTOR_ROUTING_KEY, uploadDoctorImage);
        this.rabbitTemplate.convertAndSend(RabbitMQ.REMOVE_DOCTOR_EXCHANGE, RabbitMQ.REMOVE_DOCTOR_ROUTING_KEY, doctorProfileModel.getImage());
        
        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);
        return DoctorConvert.convertToResponse(doctorProfileModel);
    }

    public AccountDetail.DoctorDetailResponse handleGetDoctorProfile(Authentication authentication) {
        String email = authentication.getName();
        AccountModel accountModel = this.accountService.getUserByEmail(email);
        return AccountDetailConvert.convertToDoctorDetailResponse(accountModel);
    }
}
