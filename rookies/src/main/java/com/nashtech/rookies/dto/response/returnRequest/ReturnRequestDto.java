package com.nashtech.rookies.dto.response.returnRequest;

import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnRequestDto {
    private Long id;
    private String assetCode;
    private String assetName;
    private String requestedBy;
    private Date assignedDate;
    private String acceptedBy;
    private Date returnedDate;
    private String state;
}
