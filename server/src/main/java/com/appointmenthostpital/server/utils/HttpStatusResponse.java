package com.appointmenthostpital.server.utils;

public class HttpStatusResponse {
    // Success
    public static final int OK = 200;
    public static final int CREATED = 201;
    public static final int NO_CONTENT = 204;

    // Client Error
    public static final int BAD_REQUEST = 400;
    public static final int UNAUTHORIZED = 401;
    public static final int FORBIDDEN = 403;
    public static final int NOT_FOUND = 404;

    // Server Error
    public static final int INTERNAL_SERVER_ERROR = 500;
    public static final int BAD_GATEWAY = 502;
    public static final int SERVICE_UNAVAILABLE = 503;

    // Message
    public static final String BAD_MESSAGE = "BAD REQUEST";
    public static final String SUCCESS_MESSAGE = "REQUEST SUCCESS";
    public static final String INTERNAL_MESSAGE = "INTERNAL SERVER ERROR";
    public static final String BODY_MISSING = "REQUIRED REQUEST BODY IS MISSING";
    public static final String NO_RESOURCE = "NO STATIC RESOURCE API";
    public static final String EXISTS_RESOURCE = "EXIST RESOURCE";
    public static final String UNAUTHORIZED_MESSAGE = "UNAUTHORIZED";

}
