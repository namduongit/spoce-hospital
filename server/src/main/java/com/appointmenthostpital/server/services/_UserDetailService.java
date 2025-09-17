package com.appointmenthostpital.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.models.UserModel;

@Service
public class _UserDetailService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = this.userService.getUserByEmail(username);
        if (userModel == null) throw new UsernameNotFoundException("Không tìm thấy tài khoản");
        return User
        .withUsername(userModel.getEmail())
        .password(userModel.getPassword())
        .authorities(userModel.getRole()).build();
    }
    
}
