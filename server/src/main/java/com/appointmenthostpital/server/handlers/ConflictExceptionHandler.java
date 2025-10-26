package com.appointmenthostpital.server.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.exceptions.ConflictException;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class ConflictExceptionHandler {
    
    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<RestResponse<?>> conflictExceptionHandler(ConflictException exception) {
        RestResponse<?> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.CONFLICT);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.CONFLICT_MESSAGE);
        restResponse.setErrorMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatusResponse.CONFLICT).body(restResponse);
    }
}
