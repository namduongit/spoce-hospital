package com.appointmenthostpital.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.PrescriptionInvoiceDetailModel;

@Repository
public interface PrescriptionInvoiceDetailRepository extends JpaRepository<PrescriptionInvoiceDetailModel, Long> {

}
