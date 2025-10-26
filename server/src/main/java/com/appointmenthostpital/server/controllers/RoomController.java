package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.responses.RoomResponse;
import com.appointmenthostpital.server.services.RoomService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("")
    public ResponseEntity<RestResponse<List<RoomResponse>>> handleGetRoomList() {
        List<RoomResponse> responses = this.roomService.handleGetRoomList();
        return ResponseEntity.status(HttpStatusResponse.OK).body(new RestResponse<List<RoomResponse>>(200, true,
                responses, HttpStatusResponse.SUCCESS_MESSAGE, null));
    }

    @PostMapping("")
    public ResponseEntity<RestResponse<RoomResponse>> handleCreateRoom(
            @Valid @RequestBody AdminRoomDTO.CreateRoomRequest request) {
        RoomResponse response = this.roomService.handleCreateRoom(request);
        return ResponseEntity.status(HttpStatusResponse.CREATED).body(new RestResponse<RoomResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestResponse<RoomResponse>> handleUpdateRoom(
            @PathVariable(name = "id", required = true) Long id,
            @Valid @RequestBody AdminRoomDTO.UpdateRoomRequest request) {
        RoomResponse response = this.roomService.handleUpdateRoom(id, request);
        return ResponseEntity.ok().body(new RestResponse<RoomResponse>(
                HttpStatusResponse.OK,
                true,
                response,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RestResponse<?>> handleDeleteRoom(
            @PathVariable(name = "id", required = true) Long id) {
        this.roomService.handleDeleteRoom(id);
        return ResponseEntity.ok().body(new RestResponse<>(
                HttpStatusResponse.OK,
                true,
                null,
                HttpStatusResponse.SUCCESS_MESSAGE,
                null));
    }
}
