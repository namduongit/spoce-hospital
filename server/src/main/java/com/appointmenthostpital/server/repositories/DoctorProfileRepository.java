package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.DoctorProfileModel;

@Repository
public interface DoctorProfileRepository extends JpaRepository<DoctorProfileModel, Long> {
    
}
