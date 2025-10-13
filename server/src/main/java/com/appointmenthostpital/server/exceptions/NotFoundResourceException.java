package com.appointmenthostpital.server.exceptions;

public class NotFoundResourceException extends RuntimeException {
    public NotFoundResourceException(String message) {
        super(message);
    }
}
