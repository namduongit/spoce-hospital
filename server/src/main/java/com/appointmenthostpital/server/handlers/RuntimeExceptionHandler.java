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
import com.appointmenthostpital.server.exceptions.UploadFileException;
import com.appointmenthostpital.server.exceptions.VNPayException;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class RuntimeExceptionHandler {
    @ExceptionHandler(value = {
        PasswordNotValidException.class,
        NotAllowedException.class,
        DuplicateResourceException.class,
        NotFoundResourceException.class,
        AccountLockedException.class,
        UploadFileException.class,
        NullPointerException.class,
        VNPayException.class
    })
    public ResponseEntity<RestResponse<?>> runtimeExceptionHandler(Exception exception) {
        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.BAD_REQUEST);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(restResponse);
    }
}
