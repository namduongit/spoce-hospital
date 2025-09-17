package com.appointmenthostpital.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {
    @GetMapping
    public String application() {
        return "Server is running...";
    }
}
