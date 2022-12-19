package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.request.user.ChangePasswordRequestDto;
import com.nashtech.rookies.dto.request.user.LoginRequestDto;
import com.nashtech.rookies.dto.response.user.LoginResponseDto;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import com.nashtech.rookies.jwt.JwtProvider;
import com.nashtech.rookies.repository.UsersRepository;
import com.nashtech.rookies.security.userprincal.UserPrinciple;
import com.nashtech.rookies.services.interfaces.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthServiceImpl implements AuthService {
	AuthenticationManager authenticationManager;
	JwtProvider jwtProvider;
	UsersRepository usersRepository;
	PasswordEncoder passwordEncoder;

	@Autowired
	public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider,
			UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
		this.authenticationManager = authenticationManager;
		this.jwtProvider = jwtProvider;
		this.usersRepository = usersRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public LoginResponseDto login(LoginRequestDto dto) {
		Optional<Users> userOptional = usersRepository.findByUsername(dto.getUsername());

		if (userOptional.isEmpty()) {
			throw new InvalidDataInputException("Username or password is incorrect. Please try again");
		}
		
		if(userOptional.get().isDisabled()) {
			throw new InvalidDataInputException("Your account is blocked");
		}

		Users user = userOptional.get();

		if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new InvalidDataInputException("Username or password is incorrect. Please try again");
		}

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.createToken(authentication);

		LoginResponseDto loginResponseDto = new LoginResponseDto(user.getUsername(), user.getFullName(), user.getRole(),
				user.getLocation(), token, user.isEnabled());

		return loginResponseDto;
	}

	@Override
	public String changePassword(ChangePasswordRequestDto dto){


		boolean checkRegex = Pattern.matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,50}$", dto.getNewPassword());

		if(!checkRegex){
			throw new InvalidDataInputException( "Minimum eight characters and Maximum fifty characters, at least one letter, one number and one special character");
		}
		UserPrinciple userPrinciple= (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Users user = usersRepository.findUsersById(userPrinciple.getId());
		if(!user.isEnabled()){
			user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
			user.setEnabled(true);
			usersRepository.save(user);
			return "Successfully";
		}

		if(dto.getOldPassword()==null){
				throw new InvalidDataInputException ("Old password not empty");
		}

		if(!passwordEncoder.matches(dto.getOldPassword(),user.getPassword())){
			throw new InvalidDataInputException("Old Password incorrect");
		}
		else{
			user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
			usersRepository.save(user);
			return "Successfully";
			}
		}


}
