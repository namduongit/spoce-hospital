package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.MedicineModel;

@Repository
public interface MedicineRepository extends JpaRepository<MedicineModel, Long> {
}
