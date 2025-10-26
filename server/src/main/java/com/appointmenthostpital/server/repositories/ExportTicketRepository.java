package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.ExportTicketModel;

@Repository
public interface ExportTicketRepository extends JpaRepository<ExportTicketModel, Long> {
    
}
