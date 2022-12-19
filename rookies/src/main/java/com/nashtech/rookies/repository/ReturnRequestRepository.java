package com.nashtech.rookies.repository;

import com.nashtech.rookies.entity.ReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
	boolean existsByAssignmentId(Long id);
}