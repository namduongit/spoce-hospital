package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * 
     * @param username
     * @return
     */
    public UserModel getUserByEmail(String username) {
        return this.userRepository.findByEmail(username);
    }

    /**
     * 
     * @return
     */
    public List<UserModel> getUserList() {
        return this.userRepository.findAll();
    }
}
