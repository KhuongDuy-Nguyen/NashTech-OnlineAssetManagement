package com.nashtech.rookies.mapper;

import com.nashtech.rookies.dto.request.user.UserRequestDto;
import com.nashtech.rookies.entity.Users;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class UserMapper {
	public Users mapUserUpdateDtoToUser(UserRequestDto dto, String username, Date dobDate, Date joinedDate, String code) {
		
		return Users.builder()
				.firstName(dto.getFirstName())
				.lastName(dto.getLastName())
				.fullName(dto.getFirstName() + " " + dto.getLastName())
				.dob(dobDate)
				.joinedDate(joinedDate)
				.createdDate(new Date())
				.username(username)
				.role(dto.getRole())
				.gender(dto.isGender())
				.code(code)
				.build();
	}
}
