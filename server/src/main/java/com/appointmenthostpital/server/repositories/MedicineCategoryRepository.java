package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.MedicineCategoryModel;

@Repository
public interface MedicineCategoryRepository extends JpaRepository<MedicineCategoryModel, Long> {

}
