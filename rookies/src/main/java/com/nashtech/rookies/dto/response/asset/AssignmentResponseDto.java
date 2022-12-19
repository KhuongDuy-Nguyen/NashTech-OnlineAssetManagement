package com.nashtech.rookies.dto.response.asset;

import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentResponseDto {
	private String assignedTo;
	private String assignedBy;
	private Date returnDate;
	private Date assignedDate;
}
