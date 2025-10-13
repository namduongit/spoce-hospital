package com.appointmenthostpital.server.configs;

import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AccessDeniedConfig implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json;charset=UTF-8");
        RestResponse<Object> restResponse = new RestResponse<>(
                HttpServletResponse.SC_FORBIDDEN,
                false,
                null,
                null,
                accessDeniedException.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(restResponse));
    }
}
