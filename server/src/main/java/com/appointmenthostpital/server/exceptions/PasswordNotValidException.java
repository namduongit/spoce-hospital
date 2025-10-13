package com.appointmenthostpital.server.exceptions;

public class PasswordNotValidException extends RuntimeException {
    public PasswordNotValidException(String message) {
        super(message);
    }
}
