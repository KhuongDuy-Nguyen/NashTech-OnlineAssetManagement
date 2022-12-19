package com.nashtech.rookies.dto.response.assignment;

import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentResponseDto {
	private Long id;
	private String assetCode;
	private String assetName;
	private String categoryName;
	private String assignedTo;
	private String assignedBy;
	private Date assignedDate;
	private boolean stateReturnRequest;
	private String state;
}
