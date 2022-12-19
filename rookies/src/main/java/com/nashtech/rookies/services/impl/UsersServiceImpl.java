package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.request.user.UpdateUserRequestDto;
import com.nashtech.rookies.dto.request.user.UserRequestDto;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import com.nashtech.rookies.mapper.UserMapper;
import com.nashtech.rookies.repository.AssignmentRepository;
import com.nashtech.rookies.repository.UsersRepository;
import com.nashtech.rookies.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UsersServiceImpl implements com.nashtech.rookies.services.interfaces.UsersService {


	UsersRepository usersRepository;
	UserMapper userMapper;
	UserUtil userUtil;

	AssignmentRepository assignmentRepository;
	PasswordEncoder passwordEncoder;

	@Autowired
	public UsersServiceImpl(UserUtil userUtil, UsersRepository usersRepository, UserMapper userMapper,
			PasswordEncoder passwordEncoder,AssignmentRepository repository) {
		this.userUtil = userUtil;
		this.usersRepository = usersRepository;
		this.userMapper = userMapper;
		this.passwordEncoder = passwordEncoder;
		this.assignmentRepository =repository;
	}

	//    region Show information
	//    Find all users by admin locations
	@Override
	public List<Users> showAll() {
		return usersRepository.findByLocationAndDisabledIsFalseOrderByCodeAsc(userUtil.getAddressFromUserPrinciple());
	}

	//    Show information of user by id
	@Override
	public Users findByUserId(Long userId) throws Exception {
		if (userId == 0) {
			throw new Exception("UserID must not be empty");
		}

		Users users = usersRepository.findUsersById(userId);

		if (users == null) {
			throw new Exception("Can't find any user with id: " + userId);
		} else {
			return users;
		}
	}

	//    Sort users by JoinedDate
	@Override
	public List<Users> sortByJoinedDateDesc() {
		return usersRepository.findByLocationOrderByJoinedDateDesc(userUtil.getAddressFromUserPrinciple());
	}

	@Override
	public List<Users> sortByJoinedDateAsc() {
		return usersRepository.findByLocationOrderByJoinedDateAsc(userUtil.getAddressFromUserPrinciple());
	}

//    Sort users by code
	@Override
	public List<Users> sortByCodeDesc() {
		return usersRepository.findByLocationOrderByCodeDesc(userUtil.getAddressFromUserPrinciple());
	}

	@Override
	public List<Users> sortByCodeAsc() {
		return usersRepository.findByLocationOrderByCodeAsc(userUtil.getAddressFromUserPrinciple());
	}

//    Sort users by full name
	@Override
	public List<Users> sortByFullNameDesc() {
		return usersRepository.findByLocationOrderByFullNameDesc(userUtil.getAddressFromUserPrinciple());
	}

	@Override
	public List<Users> sortByFullNameAsc() {
		return usersRepository.findByLocationOrderByFullNameAsc(userUtil.getAddressFromUserPrinciple());
	}

//    Sort users by role
	@Override
	public List<Users> sortByRoleDesc() {
		return usersRepository.findByLocationOrderByRoleDesc(userUtil.getAddressFromUserPrinciple());
	}
    @Override
    public List<Users> sortByRoleAsc() {
        return usersRepository.findByLocationOrderByRoleAsc(userUtil.getAddressFromUserPrinciple());
    }

	@Override
	public List<Users> sortByUpdatedDateDesc() {
		return usersRepository.findByLocationOrderByUpdatedDateDesc(userUtil.getAddressFromUserPrinciple());
	}

//    endregion

	//    region Create user
    @Override
    public Users createUser(UserRequestDto dto) {

		if (!dto.getRole().equals("ADMIN") && !dto.getRole().equals("STAFF")) {
			throw new InvalidDataInputException("Role is invalid");
		}

		if (!userUtil.isValidDate(dto.getDob())) {
			throw new InvalidDataInputException("Date of birth is invalid");
		}

		if (!userUtil.isValidDate(dto.getJoinedDate())) {
			throw new InvalidDataInputException("Join date is invalid");
		}

		Date dobDate = userUtil.convertStrDateToObDate(dto.getDob());

		Date joinedDate = userUtil.convertStrDateToObDate(dto.getJoinedDate());

		if (!userUtil.isValidAge(dobDate)) {
			throw new InvalidDataInputException("User is under 18");
		}

		if (joinedDate.before(dobDate)) {
			throw new InvalidDataInputException("Joined date is not later than Date of Birth");
		}

		dto.setFirstName(userUtil.capitalizeWord(dto.getFirstName()));
		dto.setLastName(userUtil.capitalizeWord(dto.getLastName()));

		String username = userUtil.generatePrefixUsername(dto.getFirstName(), dto.getLastName());

		List<Users> users = usersRepository.findByUsernameContaining(username);

		if (!users.isEmpty()) {
			String suffix = userUtil.generateSuffixUsername(users, username);
			username = username + suffix;
		}
		String password = userUtil.generatePassword(username, dto.getDob());

		Long count = usersRepository.count();

		String code = userUtil.generateCode(count);

		Users user = userMapper.mapUserUpdateDtoToUser(dto, username, dobDate, joinedDate, code);

		user.setLocation(userUtil.getAddressFromUserPrinciple());

		user.setPassword(passwordEncoder.encode(password));
		
		user.setEnabled(false);

		user = usersRepository.save(user);
		
		return user;
	}

    
//    endregion

	//    region Update user
    @Override
    public Users updateUser(UpdateUserRequestDto userUpdateDto){
        Users user = usersRepository.findUsersById(userUpdateDto.getId());

        if(user == null){
            throw new InvalidDataInputException("Can't find any user with id: " + userUpdateDto.getId());
        }else{
            if (!userUpdateDto.getRole().equals("ADMIN") && !userUpdateDto.getRole().equals("STAFF")) {
                throw new InvalidDataInputException("Role is invalid");
            }

            if (!userUtil.isValidDate(userUpdateDto.getDob())) {
                throw new InvalidDataInputException("Date of birth is invalid");
            }

            if (!userUtil.isValidDate(userUpdateDto.getJoinedDate())) {
                throw new InvalidDataInputException("Join date is invalid");
            }

            Date dobDate = userUtil.convertStrDateToObDate(userUpdateDto.getDob());

            Date joinedDate = userUtil.convertStrDateToObDate(userUpdateDto.getJoinedDate());

            if (!userUtil.isValidAge(dobDate)) {
                throw new InvalidDataInputException("User is under 18");
            }

            if (joinedDate.before(dobDate)) {
                throw new InvalidDataInputException("Joined date is not later than Date of Birth");
            }

            user.setDob(dobDate);
            user.setGender(userUpdateDto.isGender());
            user.setJoinedDate(joinedDate);
            user.setRole(userUpdateDto.getRole());
            user.setUpdatedDate(new Date());
            Users userResponse= usersRepository.save(user);
//            String message="Update Success";
            return userResponse;
        }

    }

//    endregion

	//    region Delete user
	@Override
	public String checkValidAssigmentUser(Long userId){
		Users user  =usersRepository.findUsersById(userId);
		if(user == null){
			return "Not Found";
		}
		List<Assignment> listValidAsmBy = assignmentRepository.checkAssignmentUserAssignedBy(userId);
		List<Assignment> listValidAsmTo = assignmentRepository.checkAssignmentUserAssignedTo(userId);

		if(!listValidAsmBy.isEmpty()) {return "1";}
		if(!listValidAsmTo.isEmpty()) {return "1";}

		return "0";
	}

	@Override
	public String disableUser(Long userId){
		Users user = usersRepository.findUsersById(userId);
		user.setDisabled(true);
		usersRepository.save(user);
		return "User is hide";

	}

	@Override
	public List<Assignment> getAllByUserIdGetAsm(Long userId){
		Users user = usersRepository.findUsersById(userId);
		List<Assignment> listAsmOfUser = assignmentRepository.findAllByAssignedTo(user);
		return listAsmOfUser;
	}

//    endregion
}
