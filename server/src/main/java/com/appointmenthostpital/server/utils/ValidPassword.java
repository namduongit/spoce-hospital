package com.appointmenthostpital.server.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ValidPassword {
    @Autowired
    private static PasswordEncoder passwordEncoder;

    public static boolean comparePassword(String password, String passwordConfirm) {
        return password.equals(passwordConfirm);
    }

    public static boolean isPasswordMatch(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public static String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
