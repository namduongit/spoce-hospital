package com.appointmenthostpital.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.AppointmentModel;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentModel, Long> {
    @Query("SELECT a FROM AppointmentModel a WHERE a.doctorModel.id = ?1 AND a.status = ?2")
    List<AppointmentModel> findByDoctorIdAndStatus(Long doctorId, String status);
}
