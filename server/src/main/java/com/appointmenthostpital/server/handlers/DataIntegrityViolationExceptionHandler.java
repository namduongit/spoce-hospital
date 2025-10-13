package com.appointmenthostpital.server.handlers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class DataIntegrityViolationExceptionHandler {
    // Data Integrity Violation Exception - Exists Resource (400 API) in server side
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<RestResponse<?>> dataIntegrityViolationExceptionHandler(DataIntegrityViolationException exception) {
        RestResponse<?> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.BAD_REQUEST);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(HttpStatusResponse.EXISTS_RESOURCE);

        return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(restResponse);
    }
}
