package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.UserProfileModel;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfileModel, Long> {
    
}
