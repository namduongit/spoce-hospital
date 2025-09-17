package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.RoomModel;

@Repository
public interface RoomRepository extends JpaRepository<RoomModel, Long> {
    
}
