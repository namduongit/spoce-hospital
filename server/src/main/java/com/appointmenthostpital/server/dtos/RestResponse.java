package com.appointmenthostpital.server.dtos;

public class RestResponse<T> {
    private int statusCode;
    private boolean result;
    private T data;
    
    private String message;
    private Object errorMessage;

    public RestResponse() {
    }

    public RestResponse(int statusCode, boolean result, T data, String message, Object errorMessage) {
        this.statusCode = statusCode;
        this.result = result;
        this.data = data;
        this.message = message;
        this.errorMessage = errorMessage;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
    
    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getErrorMessage() {
        return errorMessage;
    }
    
    public void setErrorMessage(Object errorMessage) {
        this.errorMessage = errorMessage;
    }

    @Override
    public String toString() {
        return "RestResponse [statusCode=" + statusCode + ", result=" + result + ", data=" + data + ", message="
                + message + ", errorMessage=" + errorMessage + "]";
    }
}
