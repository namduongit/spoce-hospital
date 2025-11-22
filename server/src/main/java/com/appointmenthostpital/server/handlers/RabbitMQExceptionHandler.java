package com.appointmenthostpital.server.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.exceptions.LoadResourceException;
import com.appointmenthostpital.server.exceptions.MailException;
import com.appointmenthostpital.server.exceptions.RabbitMQException;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class RabbitMQExceptionHandler {
    @ExceptionHandler({
        RabbitMQException.class,
        MailException.class,
        LoadResourceException.class
    })
    public ResponseEntity<RestResponse<?>> rabbitMQExceptionHandler(Exception exception) {
        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.BAD_REQUEST);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(restResponse);
    }
}
