package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{
    UserModel findByEmail(String email);
}
