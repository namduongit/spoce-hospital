package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.AccountConvert;
import com.appointmenthostpital.server.dtos.admin.AdminAccountDTO;
import com.appointmenthostpital.server.exceptions.DuplicateResourceException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.repositories.AccountRepository;
import com.appointmenthostpital.server.responses.AccountResponse;
import com.appointmenthostpital.server.utils.ValidPassword;

@Service
public class AccountService {
    @Autowired
    private AccountRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AccountModel getUserById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy tài khoản"));
    }

    public AccountModel getAccountById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy tài khoản"));
    }

    public AccountModel getUserByEmail(String email) {
        AccountModel userModel = this.userRepository.findByEmail(email);
        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        return userModel;
    }

    public AccountModel save(AccountModel userModel) {
        return this.userRepository.save(userModel);
    }

    public List<AccountResponse> handleGetAccountList() {
        List<AccountModel> models = this.userRepository.findAll();
        return models.stream().map(AccountConvert::convertToResponse).toList();
    }

    public AccountResponse handleCreateAccount(AdminAccountDTO.CreateAccountRequest request) {
        if (!ValidPassword.comparePassword(request.getPassword(), request.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu và mật khẩu xác nhận không khớp");
        }

        if (this.userRepository.findByEmail(request.getEmail()) != null) {
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        AccountModel userModel = new AccountModel();
        userModel.setPassword(this.passwordEncoder.encode(request.getPassword()));
        AccountConvert.convertFromCreateRequest(userModel, request);
        userModel = this.userRepository.save(userModel);
        return AccountConvert.convertToResponse(userModel);
    }

    public AccountResponse handleUpdateAccount(Long id, AdminAccountDTO.UpdateAccountRequest request) {
        AccountModel model = this.getUserById(id);
        model.setPassword(this.passwordEncoder.encode(request.getPassword()));
        AccountConvert.convertFromUpdateRequest(model, request);
        model = this.userRepository.save(model);
        return AccountConvert.convertToResponse(model);
    }

    
}
