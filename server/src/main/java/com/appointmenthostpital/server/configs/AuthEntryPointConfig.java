package com.appointmenthostpital.server.configs;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.utils.HttpStatusResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthEntryPointConfig implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpStatusResponse.UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");

        RestResponse<Object> restResponse = new RestResponse<>(
                HttpStatusResponse.UNAUTHORIZED,
                false,
                null,
                HttpStatusResponse.UNAUTHORIZED_MESSAGE,
                authException.getMessage());
        response.setStatus(HttpStatusResponse.UNAUTHORIZED);
        
        response.getWriter().write(new ObjectMapper().writeValueAsString(restResponse));
    }
}
