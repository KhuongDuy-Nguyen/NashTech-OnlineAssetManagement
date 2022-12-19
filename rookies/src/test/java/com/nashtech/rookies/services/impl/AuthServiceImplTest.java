package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.request.user.ChangePasswordRequestDto;
import com.nashtech.rookies.dto.request.user.LoginRequestDto;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import com.nashtech.rookies.jwt.JwtProvider;
import com.nashtech.rookies.repository.UsersRepository;
import com.nashtech.rookies.security.userprincal.UserPrinciple;
import com.nashtech.rookies.utils.UserUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AuthServiceImplTest {
	AuthenticationManager authenticationManager;
	JwtProvider jwtProvider;
	UsersRepository usersRepository;
	PasswordEncoder passwordEncoder;

	UserUtil userUtil;
	UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken;
	Authentication authentication;

	UserPrinciple userPrinciple;
	AuthServiceImpl authServiceImpl;

	@BeforeEach
	void beforeEach() {
		userUtil = mock(UserUtil.class);
		authenticationManager = mock(AuthenticationManager.class);
		jwtProvider = mock(JwtProvider.class);
		usersRepository = mock(UsersRepository.class);
		passwordEncoder = mock(PasswordEncoder.class);
		usernamePasswordAuthenticationToken = mock(UsernamePasswordAuthenticationToken.class);
		authentication = mock(Authentication.class);
		userPrinciple = mock(UserPrinciple.class);
		authServiceImpl = new AuthServiceImpl(authenticationManager, jwtProvider, usersRepository, passwordEncoder);
	}

	@Test
	void login_ShouldThrowInvalidDataInputException_WhenUsernameInvalid() {
		LoginRequestDto dto = LoginRequestDto.builder().username("trongbt123").password("123456").build();

		when(usersRepository.findByUsername("trongbt123")).thenReturn(Optional.empty());

		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			authServiceImpl.login(dto);
		});

		Assertions.assertEquals("Username or password is incorrect. Please try again", actualException.getMessage());
	}

	@Test
	void login_ShouldThrowInvalidDataInputException_WhenAccountIsBlock() {
		LoginRequestDto dto = LoginRequestDto.builder().username("trongbt123").password("123456").build();
		Users user = Users.builder().username("trongbt123").password("123456").disabled(true).build();

		when(usersRepository.findByUsername("trongbt123")).thenReturn(Optional.of(user));

		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			authServiceImpl.login(dto);
		});

		Assertions.assertEquals("Your account is blocked", actualException.getMessage());
	}

	@Test
	void login_ShouldThrowInvalidDataInputException_WhenPasswordInvalid() {
		LoginRequestDto dto = LoginRequestDto.builder().username("trongbt123").password("123456").build();
		Users user = mock(Users.class);

		when(usersRepository.findByUsername("trongbt123")).thenReturn(Optional.of(user));

		when(passwordEncoder.matches("123456", user.getPassword())).thenReturn(false);

		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			authServiceImpl.login(dto);
		});

		Assertions.assertEquals("Username or password is incorrect. Please try again", actualException.getMessage());
	}

	@Test
	void login_ShouldReturnLoginResponseDto_WhenDatavalid() {
		LoginRequestDto dto = LoginRequestDto.builder().username("trongbt123").password("123456").build();
		Users user = mock(Users.class);

		when(usersRepository.findByUsername("trongbt123")).thenReturn(Optional.of(user));

		when(passwordEncoder.matches("123456", user.getPassword())).thenReturn(true);

		when(authenticationManager.authenticate(usernamePasswordAuthenticationToken)).thenReturn(authentication);

		authServiceImpl.login(dto);
	}

	@Test
	void changePassword_ShouldReturnErr_WhenDataNotValid() {

		ChangePasswordRequestDto dto = ChangePasswordRequestDto.builder().oldPassword("trongbt123")
				.newPassword("123456").build();
		Users user = new Users();
		Long id = 1L;

		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			authServiceImpl.changePassword(dto);
		});
		Assertions.assertEquals(
				"Minimum eight characters and Maximum fifty characters, at least one letter, one number and one special character",
				actualException.getMessage());
	}

	@Test
	void changePassword_ShouldReturnSuccess_WhenRegexValid() {
		Authentication authentication = mock(Authentication.class);
		SecurityContext securityContext = mock(SecurityContext.class);
		UserPrinciple userPrinciple1 = new UserPrinciple();
		when(securityContext.getAuthentication()).thenReturn(authentication);
		SecurityContextHolder.setContext(securityContext);
		when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		ChangePasswordRequestDto dto = ChangePasswordRequestDto.builder().oldPassword("trongbt123")
				.newPassword("abcd1234!@#$").build();
		Users user = new Users();
		user.setEnabled(false);
		when(usersRepository.findUsersById(userPrinciple1.getId())).thenReturn(user);
		String actual = authServiceImpl.changePassword(dto);
		Assertions.assertEquals("Successfully", actual);
	}

	@Test
	void changePassword_ShouldReturnErr_WhenOldPasswordInCorrect() {
		Authentication authentication = mock(Authentication.class);
		SecurityContext securityContext = mock(SecurityContext.class);
		UserPrinciple userPrinciple1 = new UserPrinciple();
		when(securityContext.getAuthentication()).thenReturn(authentication);
		SecurityContextHolder.setContext(securityContext);
		when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		ChangePasswordRequestDto dto = ChangePasswordRequestDto.builder().oldPassword("").newPassword("abcd1234!@#$")
				.build();
		Users user = new Users();
		user.setEnabled(true);
		when(usersRepository.findUsersById(userPrinciple1.getId())).thenReturn(user);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			authServiceImpl.changePassword(dto);
		});
		Assertions.assertEquals("Old Password incorrect", actualException.getMessage());
	}

	@Test
	void changePassword_ShouldReturnErr_WhenOldPasswordIsNull() {
		Authentication authentication = mock(Authentication.class);
		SecurityContext securityContext = mock(SecurityContext.class);
		UserPrinciple userPrinciple1 = new UserPrinciple();
		when(securityContext.getAuthentication()).thenReturn(authentication);
		SecurityContextHolder.setContext(securityContext);
		when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		ChangePasswordRequestDto dto = ChangePasswordRequestDto.builder().oldPassword(null).newPassword("abcd1234!@#$")
				.build();
		Users user = new Users();
		user.setEnabled(true);
		when(usersRepository.findUsersById(userPrinciple1.getId())).thenReturn(user);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			authServiceImpl.changePassword(dto);
		});
		Assertions.assertEquals("Old password not empty", actualException.getMessage());
	}

	@Test
	void changePassword_ShouldReturnSuccess() {
		Authentication authentication = mock(Authentication.class);
		SecurityContext securityContext = mock(SecurityContext.class);
		UserPrinciple userPrinciple1 = new UserPrinciple();
		when(securityContext.getAuthentication()).thenReturn(authentication);
		SecurityContextHolder.setContext(securityContext);
		when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		ChangePasswordRequestDto dto = ChangePasswordRequestDto.builder().oldPassword("abcd1111!!!!")
				.newPassword("abcd1234!@#$").build();
		Users user = new Users();
		user.setEnabled(true);
		user.setPassword("abcd1111!!!!");
		when(usersRepository.findUsersById(userPrinciple1.getId())).thenReturn(user);
		when(passwordEncoder.matches(dto.getOldPassword(), user.getPassword())).thenReturn(true);
		String actual = authServiceImpl.changePassword(dto);

		Assertions.assertEquals("Successfully", actual);
	}

}
