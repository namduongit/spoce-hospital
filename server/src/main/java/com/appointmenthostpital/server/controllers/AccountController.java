package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminAccountDTO;
import com.appointmenthostpital.server.responses.AccountResponse;
import com.appointmenthostpital.server.services.AccountService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

        @GetMapping("")
        public ResponseEntity<RestResponse<List<AccountResponse>>> handleGetAccountList() {
                List<AccountResponse> userModels = this.accountService.handleGetAccountList();
                return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<AccountResponse>>(HttpStatusResponse.OK, true,
                                userModels, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        @PostMapping("")
        public ResponseEntity<RestResponse<AccountResponse>> handleCreateAccount(
                        @Valid @RequestBody AdminAccountDTO.CreateAccountRequest request) {
                AccountResponse response = this.accountService.handleCreateAccount(request);
                return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<AccountResponse>(
                                HttpStatusResponse.CREATED,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }

        @PutMapping("/{id}")
        public ResponseEntity<RestResponse<AccountResponse>> handleUpdateAccount(
                        @RequestBody AdminAccountDTO.UpdateAccountRequest request,
                        @Valid @PathVariable(name = "id", required = true) Long id) {
                AccountResponse response = this.accountService.handleUpdateAccount(id, request);
                return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<AccountResponse>(
                                HttpStatusResponse.OK,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }
}