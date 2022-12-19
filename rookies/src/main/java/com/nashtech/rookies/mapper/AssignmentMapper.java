package com.nashtech.rookies.mapper;

import com.nashtech.rookies.dto.response.assignment.AssignmentDetailResponseDto;
import com.nashtech.rookies.dto.response.assignment.AssignmentResponseDto;
import com.nashtech.rookies.dto.response.assignment.AssignmentUpdateResponseDto;
import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AssignmentMapper {

	@Autowired
	AssetMapper assetMapper;

	public Assignment mapToAssignment(Asset asset, Users assignedBy, Users assignedTo, String note, String state,
			Date assignedDate, Date createdDate) {
		return Assignment.builder().asset(asset).assignedBy(assignedBy).assignedTo(assignedTo).note(note).state(state)
				.assignedDate(assignedDate).createdDate(createdDate).build();
	}

	public AssignmentResponseDto mapToResponseAssignment(Assignment assignment) {
		return AssignmentResponseDto.builder()
				.id(assignment.getId())
				.assetCode(assignment.getAsset().getCode())
				.assetName(assignment.getAsset().getName())
				.categoryName(assignment.getAsset().getCategory().getName())
				.stateReturnRequest(assignment.isCheckReturn())
				.assignedTo(assignment.getAssignedTo().getUsername())
				.assignedBy(assignment.getAssignedBy().getUsername()).assignedDate(assignment.getAssignedDate())
				.state(assignment.getState()).build();
	}

	public AssignmentUpdateResponseDto mapToUpdateResponseAssignment(Assignment assignment) {
		return AssignmentUpdateResponseDto.builder().id(assignment.getId()).user(assignment.getAssignedTo())
				.asset(assetMapper.mapToDto(assignment.getAsset())).assignedDate(assignment.getAssignedDate())
				.note(assignment.getNote()).build();
	}

	public List<AssignmentResponseDto> mapListAssignmentEntityToDto(List<Assignment> assignmentList) {
		return assignmentList.stream().map(assignment -> mapToResponseAssignment(assignment))
				.collect(Collectors.toList());
	}

	public AssignmentDetailResponseDto mapToResponseAssigmentDetail(Assignment assignment) {
		return AssignmentDetailResponseDto.builder().assetCode(assignment.getAsset().getCode())
				.assetName(assignment.getAsset().getName()).specification(assignment.getAsset().getSpecification())
				.assignedTo(assignment.getAssignedTo().getUsername())
				.assignedBy(assignment.getAssignedBy().getUsername()).assignedDate(assignment.getAssignedDate())
				.state(assignment.getState()).note(assignment.getNote()).build();

	}
}
