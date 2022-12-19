package com.nashtech.rookies.dto.request.user;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequestDto {
    @NotNull
    private Long id;
    @NotBlank(message = "Date of Birth is required.")
    private String dob;

    @NotNull
    private boolean gender;

    @NotBlank(message = "Joined Date is required.")
    private String joinedDate;

    @NotBlank(message = "Role is required.")
    private String role;
}
