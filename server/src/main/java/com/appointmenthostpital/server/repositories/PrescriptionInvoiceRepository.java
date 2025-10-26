package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;

@Repository
public interface PrescriptionInvoiceRepository extends JpaRepository<PrescriptionInvoiceModel, Long> {
    
}
