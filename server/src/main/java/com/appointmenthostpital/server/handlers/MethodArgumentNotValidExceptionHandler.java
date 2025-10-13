package com.appointmenthostpital.server.handlers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class MethodArgumentNotValidExceptionHandler {
    // Validation Exception (400 API)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<?>> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception) {
        RestResponse<?> restResponse = new RestResponse<>();
        List<String> strings = exception.getBindingResult().getAllErrors().stream()
            .map(error -> error.getDefaultMessage())
            .toList();
        restResponse.setStatusCode(HttpStatusResponse.BAD_REQUEST);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(strings.size() > 1 ? strings : strings.getFirst());

        return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(restResponse);
    }
}
