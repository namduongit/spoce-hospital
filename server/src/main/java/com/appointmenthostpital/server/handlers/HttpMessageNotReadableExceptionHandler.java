package com.appointmenthostpital.server.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class HttpMessageNotReadableExceptionHandler {
    // Body Missing Exception
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<RestResponse<?>> httpMessageNotReadableExceptionHandler(HttpMessageNotReadableException exception) {
        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.INTERNAL_SERVER_ERROR);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.INTERNAL_MESSAGE);
        restResponse.setErrorMessage(HttpStatusResponse.BODY_MISSING);

        return ResponseEntity.status(HttpStatusResponse.INTERNAL_SERVER_ERROR).body(restResponse);
    }
}
