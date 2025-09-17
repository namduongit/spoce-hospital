package com.appointmenthostpital.server.exceptions;

public class NotFoundRoleException extends RuntimeException {
    public NotFoundRoleException(String message) {
        super(message);
    }
}
