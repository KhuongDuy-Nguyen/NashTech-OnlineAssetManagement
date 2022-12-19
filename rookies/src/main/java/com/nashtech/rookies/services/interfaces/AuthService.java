package com.nashtech.rookies.services.interfaces;

import com.nashtech.rookies.dto.request.user.ChangePasswordRequestDto;
import com.nashtech.rookies.dto.request.user.LoginRequestDto;
import com.nashtech.rookies.dto.response.user.LoginResponseDto;

public interface AuthService {

	LoginResponseDto login(LoginRequestDto dto);

    String changePassword(ChangePasswordRequestDto dto);
}
