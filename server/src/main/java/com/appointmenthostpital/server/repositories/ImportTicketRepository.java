package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.ImportTicketModel;

@Repository
public interface ImportTicketRepository extends JpaRepository<ImportTicketModel, Long> {
    
}
