package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.ServiceInvoiceModel;

@Repository
public interface ServiceInvoiceRepository extends JpaRepository<ServiceInvoiceModel, Long> {
    
}
