package com.nashtech.rookies.services.interfaces;

import com.nashtech.rookies.dto.request.assignment.CreateAssignmentDto;
import com.nashtech.rookies.dto.request.assignment.UpdateAssignmentDto;
import com.nashtech.rookies.dto.response.assignment.AssignmentDetailResponseDto;
import com.nashtech.rookies.dto.response.assignment.AssignmentResponseDto;
import com.nashtech.rookies.dto.response.assignment.AssignmentUpdateResponseDto;

import java.util.List;

public interface AssignmentService {
	AssignmentResponseDto createAssignment(CreateAssignmentDto dto);

	AssignmentResponseDto updateAssignment(UpdateAssignmentDto dto);

	AssignmentUpdateResponseDto getUpdateAssignmentById(Long id);

	List<AssignmentResponseDto> getListAssignmentofUser();

	AssignmentDetailResponseDto getAssignmentDetail(Long id);

	List<AssignmentResponseDto> getListAssignmentofAdmin();

	AssignmentResponseDto acceptAssignment(Long id);
	AssignmentResponseDto declinedAssignment(Long id);

	
	void deleteAssignment(Long id) throws Exception;
}
