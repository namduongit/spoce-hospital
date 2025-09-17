*** Note Format Response ***
```java
package com.appointmenthostpital.server.dtos;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class FormatResponse implements ResponseBodyAdvice<Object> {
    @Override
    @Nullable
    public Object beforeBodyWrite(@Nullable Object body, MethodParameter returnType, MediaType selectedContentType,
            Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        
        if (body instanceof RestResponse) return body;
                
        ServletServerHttpResponse servletServerHttpResponse = (ServletServerHttpResponse)response;
        int statusCode = servletServerHttpResponse.getServletResponse().getStatus();
        RestResponse restResponse = new RestResponse();
        restResponse.setStatusCode(statusCode);
        restResponse.setResult(statusCode < 400);
        restResponse.setData(statusCode < 400 ? body : null);
        restResponse.setMessage(statusCode < 400 ? "Request success" : "Bad request");
        restResponse.setErrorMessage(statusCode < 400 ? null : body);
        
        body = restResponse;

        return body;
    }

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }
}

```
- This is example. You are not allowed to do that.