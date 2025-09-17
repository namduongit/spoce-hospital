package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.AppointmentModel;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentModel, Long> {
    
}
