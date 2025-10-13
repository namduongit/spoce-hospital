package com.appointmenthostpital.server.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class NoResourceFoundExceptionHandler {
    // Not Found Resource (404 API)
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<RestResponse<?>> noResourceFoundExceptionHandler(NoResourceFoundException exception) {
        RestResponse<?> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.NOT_FOUND);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(HttpStatusResponse.NO_RESOURCE);

        return ResponseEntity.status(HttpStatusResponse.NOT_FOUND).body(restResponse);
    }
}
