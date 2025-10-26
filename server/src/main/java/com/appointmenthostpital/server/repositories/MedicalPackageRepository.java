package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.MedicalPackageModel;

@Repository
public interface MedicalPackageRepository extends JpaRepository<MedicalPackageModel, Long>{

}
