package com.nashtech.rookies.dto.request.assignment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class UpdateAssignmentDto {
	private Long id;

	@NotNull(message = "User is required.")
	private Long userId;

	@NotNull(message = "Asset is required.")
	private Long assetId;

//	@NotBlank(message = "Note is required.")
	private String note;

	@NotBlank(message = "AssignedDate is required.")
	private String assignedDate;
}
