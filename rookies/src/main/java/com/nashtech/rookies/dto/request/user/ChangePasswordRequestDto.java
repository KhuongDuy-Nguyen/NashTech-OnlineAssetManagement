package com.nashtech.rookies.dto.request.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ChangePasswordRequestDto {
    private String oldPassword;
    private String newPassword;
}
