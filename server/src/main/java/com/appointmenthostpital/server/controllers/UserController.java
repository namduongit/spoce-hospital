package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    // ---------------------------------------- Public Routes ---------------------------------------- //
    

    // ---------------------------------------- Admins Routes ---------------------------------------- //
    /**
     * Get list of all users
     * @return
     */
    @GetMapping("/admin/users")
    public ResponseEntity<RestResponse<List<UserModel>>> getUserList() {
        return ResponseEntity.ok().body(
            new RestResponse<List<UserModel>>(HttpStatusResponse.OK, true, this.userService.getUserList(), HttpStatusResponse.SUCCESS_MESSAGE, null)
        );
    }
}
