package com.nashtech.rookies.controller;

import com.nashtech.rookies.dto.request.user.ChangePasswordRequestDto;
import com.nashtech.rookies.dto.request.user.LoginRequestDto;
import com.nashtech.rookies.dto.response.user.LoginResponseDto;
import com.nashtech.rookies.services.interfaces.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(authService.login(dto));
	}
	@PutMapping("/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequestDto dto){
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("message",authService.changePassword(dto));
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
}
