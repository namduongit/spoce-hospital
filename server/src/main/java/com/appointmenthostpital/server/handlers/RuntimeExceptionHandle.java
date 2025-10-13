package com.appointmenthostpital.server.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.exceptions.AccountLockedException;
import com.appointmenthostpital.server.exceptions.DuplicateResourceException;
import com.appointmenthostpital.server.exceptions.NotAllowedException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class RuntimeExceptionHandle {
    @ExceptionHandler(value = {
        PasswordNotValidException.class,
        NotAllowedException.class,
        DuplicateResourceException.class,
        NotFoundResourceException.class,
        AccountLockedException.class
    })
    public ResponseEntity<RestResponse<?>> serverExceptionHandler(Exception exception) {

        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.INTERNAL_SERVER_ERROR);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatusResponse.INTERNAL_SERVER_ERROR).body(restResponse);
    }
}
