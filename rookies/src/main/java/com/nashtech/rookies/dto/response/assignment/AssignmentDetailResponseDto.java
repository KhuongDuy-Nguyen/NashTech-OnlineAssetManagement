package com.nashtech.rookies.dto.response.assignment;

import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDetailResponseDto {
    private String assetCode;
    private String assetName;
    private String specification;
    private String assignedTo;
    private String assignedBy;
    private Date assignedDate;
    private String state;
    private String note;
}
