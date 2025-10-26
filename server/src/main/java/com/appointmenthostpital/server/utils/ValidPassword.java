package com.appointmenthostpital.server.utils;

public class ValidPassword {
    public static boolean comparePassword(String password, String passwordConfirm) {
        return password.equals(passwordConfirm);
    }
}
