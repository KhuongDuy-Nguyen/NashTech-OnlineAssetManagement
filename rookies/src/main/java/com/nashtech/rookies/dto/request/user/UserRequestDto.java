package com.nashtech.rookies.dto.request.user;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

	@NotBlank(message = "FirstName is required.")
	@Size(min = 1, max = 50, message = "FirstName is invalid")
	private String firstName;

	@NotBlank(message = "LastName is required.")
	@Size(min = 1, max = 50)
	private String lastName;

	@NotBlank(message = "Date of Birth is required.")
	private String dob;

	@NotNull
	private boolean gender;

	@NotBlank(message = "Role is required.")
	private String role;

	@NotBlank(message = "FirstName is required.")
	private String joinedDate;
}
