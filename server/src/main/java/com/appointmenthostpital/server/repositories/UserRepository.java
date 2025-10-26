package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.AccountModel;

@Repository
public interface UserRepository extends JpaRepository<AccountModel, Long>{
    AccountModel findByEmail(String email);
}
