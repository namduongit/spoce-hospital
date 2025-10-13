package com.appointmenthostpital.server.exceptions;

public class AccountLockedException extends RuntimeException {
    public AccountLockedException(String message) {
        super(message);
    }
    
}
