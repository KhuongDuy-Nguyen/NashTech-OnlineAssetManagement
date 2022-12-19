package com.nashtech.rookies.dto.response.assignment;

import com.nashtech.rookies.dto.response.asset.AssetResponseDto;
import com.nashtech.rookies.entity.Users;
import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentUpdateResponseDto {
	private Long id;
	private Users user;
	private AssetResponseDto asset;
	private Date assignedDate;
	private String note;
}
