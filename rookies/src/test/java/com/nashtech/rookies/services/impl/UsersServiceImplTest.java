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
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class UsersServiceImplTest {

	UserUtil userUtil;
	UsersRepository usersRepository;
	UserMapper userMapper;
	PasswordEncoder passwordEncoder;

	UsersServiceImpl usersServiceImpl;

	AssignmentRepository assignmentRepository;
	Users initUsers;
	Users expectedUsers;

	List<Users> mockUsers = new ArrayList<>();

	@BeforeEach
	void beforeEach() {
		userUtil = mock(UserUtil.class);
		usersRepository = mock(UsersRepository.class);
		userMapper = mock(UserMapper.class);
		initUsers = mock(Users.class);
		expectedUsers = mock(Users.class);
		passwordEncoder = mock(PasswordEncoder.class);
		assignmentRepository = mock(AssignmentRepository.class);
		usersServiceImpl = new UsersServiceImpl(userUtil, usersRepository, userMapper, passwordEncoder,assignmentRepository);

		for(int i = 0; i < 10; i++){
			mockUsers.add(
					new Users()
			);
		}
	}
	@Test
	void updateUser_ShouldThrowInvalidDataInputException_WhenUserNotFound(){

		UpdateUserRequestDto dto = new UpdateUserRequestDto();
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.updateUser(dto);
		});
		Assertions.assertEquals("Can't find any user with id: null", actualException.getMessage());
	}

	@Test
	void updateUser_ShouldThrowInvalidDataInputException_WhenRoleInValid(){
		Users user = mock(Users.class);

		UpdateUserRequestDto dto = UpdateUserRequestDto.builder().role("USER").build();
		when(usersRepository.findUsersById(dto.getId())).thenReturn(user);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.updateUser(dto);
		});
		Assertions.assertEquals("Role is invalid", actualException.getMessage());
	}

	@Test
	void updateUser_ShouldThrowInvalidDataInputException_WhenDobInValid(){
		Users user = mock(Users.class);

		UpdateUserRequestDto dto = UpdateUserRequestDto.builder().dob("30/02/2020").role("ADMIN").build();
		when(usersRepository.findUsersById(dto.getId())).thenReturn(user);
		when(userUtil.isValidDate(dto.getDob())).thenReturn(false);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.updateUser(dto);
		});
		Assertions.assertEquals("Date of birth is invalid", actualException.getMessage());
	}
	@Test
	void updateUser_ShouldThrowInvalidDataInputException_WhenJoinedDateInValid(){
		Users user = mock(Users.class);

		UpdateUserRequestDto dto = UpdateUserRequestDto.builder().dob("28/02/1990").joinedDate("28-02-2020").role("ADMIN").build();
		when(usersRepository.findUsersById(dto.getId())).thenReturn(user);
		when(userUtil.isValidDate(dto.getDob())).thenReturn(true);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.updateUser(dto);
		});
		Assertions.assertEquals("Join date is invalid", actualException.getMessage());
	}
	@Test
	void updateUser_ShouldSuccess_WhenDataValid(){
		Date dobDate = mock(Date.class);
		Date joinedDate = mock(Date.class);
		Users user = mock(Users.class);
		UpdateUserRequestDto dto = UpdateUserRequestDto.builder().id(1L).gender(true).dob("28/02/1990").joinedDate("28/02/2020").role("ADMIN").build();
		when(usersRepository.findUsersById(dto.getId())).thenReturn(user);
		when(userUtil.isValidDate("28/02/1990")).thenReturn(true);
		when(userUtil.isValidDate("28/02/2020")).thenReturn(true);
		when(userUtil.convertStrDateToObDate("28/02/1990")).thenReturn(dobDate);
		when(userUtil.convertStrDateToObDate("28/02/2020")).thenReturn(joinedDate);
		when(userUtil.isValidAge(dobDate)).thenReturn(true);
		when(joinedDate.before(dobDate)).thenReturn(false);
		when(usersRepository.save(user)).thenReturn(user);
		Users actual = usersServiceImpl.updateUser(dto);
		Assertions.assertEquals(user, actual);
	}

	@Test
	void updateUser_ShouldThrowInvalidDataInputException_WhenDobUnder18(){
		Users user = new Users();
		Date dobDate = mock(Date.class);
		Date joinedDate = mock(Date.class);
		UpdateUserRequestDto dto = UpdateUserRequestDto.builder().dob("28/02/2010").joinedDate("28/02/2020").role("ADMIN").build();
		when(usersRepository.findUsersById(dto.getId())).thenReturn(user);
		when(userUtil.isValidDate(dto.getDob())).thenReturn(true);
		when(userUtil.isValidDate(dto.getJoinedDate())).thenReturn(true);
		when(userUtil.convertStrDateToObDate(dto.getDob())).thenReturn(dobDate);
		when(userUtil.convertStrDateToObDate(dto.getDob())).thenReturn(joinedDate);

		when(userUtil.isValidAge(dobDate)).thenReturn(false);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.updateUser(dto);
		});
		Assertions.assertEquals("User is under 18", actualException.getMessage());
	}

	@Test
	void updateUser_ShouldThrowInvalidDataInputException_WhenJoinedDateBeforeDob(){
		Users user = new Users();
		Date dobDate = mock(Date.class);
		Date joinedDate = mock(Date.class);
		UpdateUserRequestDto dto = UpdateUserRequestDto.builder().dob("28/02/1990").joinedDate("28/02/2020").role("ADMIN").build();
		when(usersRepository.findUsersById(dto.getId())).thenReturn(user);
		when(userUtil.isValidDate("28/02/1990")).thenReturn(true);
		when(userUtil.isValidDate("28/02/2020")).thenReturn(true);
		when(userUtil.convertStrDateToObDate("28/02/1990")).thenReturn(dobDate);
		when(userUtil.convertStrDateToObDate("28/02/2020")).thenReturn(joinedDate);
		when(userUtil.isValidAge(dobDate)).thenReturn(true);
		when(joinedDate.before(dobDate)).thenReturn(true);
		InvalidDataInputException actualException = Assertions.assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.updateUser(dto);
		});
		Assertions.assertEquals("Joined date is not later than Date of Birth", actualException.getMessage());
	}

	//region	Test show all users
	@Test
	public void ShowAllByLocation_ShouldReturnAllUsers_WhenLocationFromAdminValid() throws Exception {
		when(usersRepository.findByLocationAndDisabledIsFalseOrderByCodeAsc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.showAll();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationAndDisabledIsFalseOrderByCodeAsc(userUtil.getAddressFromUserPrinciple());
	}

	@Test
	public void findByUserId_ShouldReturnUsers_WhenFoundId() throws Exception {
		when(usersRepository.findUsersById(1L)).thenReturn(initUsers);
		Users actualUsers = usersServiceImpl.findByUserId(1L);
		assertEquals(initUsers, actualUsers);
		verify(usersRepository).findUsersById(1L);
	}

	@Test
	public void findByUserId_ShouldThrowException_WhenNotFoundId() throws Exception {
		Exception expectedException = assertThrows(Exception.class, () -> usersServiceImpl.findByUserId(1L));
		assertEquals("Can't find any user with id: 1", expectedException.getMessage());
	}

	@Test
	public void testSortByJoinedDateDesc() {
		when(usersRepository.findByLocationOrderByJoinedDateDesc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByJoinedDateDesc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByJoinedDateDesc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByJoinedDateAsc() {
		when(usersRepository.findByLocationOrderByJoinedDateAsc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByJoinedDateAsc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByJoinedDateAsc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByCodeDesc() {
		when(usersRepository.findByLocationOrderByCodeDesc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByCodeDesc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByCodeDesc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByCodeAsc() {
		when(usersRepository.findByLocationOrderByCodeAsc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByCodeAsc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByCodeAsc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByFullNameDesc() {
		when(usersRepository.findByLocationOrderByFullNameDesc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByFullNameDesc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByFullNameDesc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByFullNameAsc() {
		when(usersRepository.findByLocationOrderByFullNameAsc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByFullNameAsc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByFullNameAsc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByRoleDesc() {
		when(usersRepository.findByLocationOrderByRoleDesc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByRoleDesc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByRoleDesc(userUtil.getAddressFromUserPrinciple());
	}
	@Test
	public void testSortByRoleAsc() {
		when(usersRepository.findByLocationOrderByRoleAsc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByRoleAsc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByRoleAsc(userUtil.getAddressFromUserPrinciple());
	}

	@Test
	public void testSortByUpdateDateDesc() {
		when(usersRepository.findByLocationOrderByUpdatedDateDesc(userUtil.getAddressFromUserPrinciple())).thenReturn(mockUsers);
		List<Users> actualUsers = usersServiceImpl.sortByUpdatedDateDesc();
		assertEquals(mockUsers.size(), actualUsers.size());
		verify(usersRepository).findByLocationOrderByUpdatedDateDesc(userUtil.getAddressFromUserPrinciple());
	}
//	endregion

	//	region Test create user
	@Test
	void createUser_ShouldThrowInvalidDataInputException_WhenRoleInValid() {
		UserRequestDto dto = UserRequestDto.builder().role("USER").build();

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.createUser(dto);
		});
		assertEquals("Role is invalid", actualException.getMessage());
	}

	@Test
	void createUser_ShouldThrowInvalidDataInputException_WhenDobInValid() {
		UserRequestDto dto = UserRequestDto.builder().dob("30/02/2020").role("ADMIN").build();

		when(userUtil.isValidDate(dto.getDob())).thenReturn(false);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.createUser(dto);
		});
		assertEquals("Date of birth is invalid", actualException.getMessage());
	}

	@Test
	void createUser_ShouldThrowInvalidDataInputException_WhenJoinedDateInValid() {
		UserRequestDto dto = UserRequestDto.builder().dob("28/02/1990").joinedDate("28/02/2020").role("ADMIN").build();

		when(userUtil.isValidDate(dto.getDob())).thenReturn(true);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.createUser(dto);
		});
		assertEquals("Join date is invalid", actualException.getMessage());
	}

	@Test
	void createUser_ShouldThrowInvalidDataInputException_WhenDobUnder18() {
		Date dobDate = mock(Date.class);
		Date joinedDate = mock(Date.class);

		UserRequestDto dto = UserRequestDto.builder().dob("28/02/1990").joinedDate("28/02/2020").role("ADMIN").build();

		when(userUtil.isValidDate(dto.getDob())).thenReturn(true);
		when(userUtil.isValidDate(dto.getJoinedDate())).thenReturn(true);

		System.out.println(dto.getDob());
		System.out.println(dto.getJoinedDate());

		when(userUtil.convertStrDateToObDate(dto.getDob())).thenReturn(dobDate);
		when(userUtil.convertStrDateToObDate(dto.getDob())).thenReturn(joinedDate);

		when(userUtil.isValidAge(dobDate)).thenReturn(false);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.createUser(dto);
		});
		assertEquals("User is under 18", actualException.getMessage());
	}

	@Test
	void createUser_ShouldThrowInvalidDataInputException_WhenJoinedDateBeforeDob() {
		Date dobDate = mock(Date.class);
		Date joinedDate = mock(Date.class);

		UserRequestDto dto = UserRequestDto.builder().dob("28/02/1990").joinedDate("28/02/2020").role("ADMIN").build();

		when(userUtil.isValidDate("28/02/1990")).thenReturn(true);
		when(userUtil.isValidDate("28/02/2020")).thenReturn(true);

		when(userUtil.convertStrDateToObDate("28/02/1990")).thenReturn(dobDate);
		when(userUtil.convertStrDateToObDate("28/02/2020")).thenReturn(joinedDate);

		when(userUtil.isValidAge(dobDate)).thenReturn(true);

		when(joinedDate.before(dobDate)).thenReturn(true);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			usersServiceImpl.createUser(dto);
		});
		assertEquals("Joined date is not later than Date of Birth", actualException.getMessage());
	}

	@Test
	void createUser_ShouldSuccess_WhenDataValid() {
		Date dobDate = mock(Date.class);
		Date joinedDate = mock(Date.class);
		Users user = mock(Users.class);
		String code = "SD0001";

		UserRequestDto dto = UserRequestDto.builder().dob("28/02/1990").joinedDate("28/02/2020").role("ADMIN")
				.firstName("trong  ").lastName("bach  thanh").build();

		when(userUtil.isValidDate("28/02/1990")).thenReturn(true);
		when(userUtil.isValidDate("28/02/2020")).thenReturn(true);

		when(userUtil.convertStrDateToObDate("28/02/1990")).thenReturn(dobDate);
		when(userUtil.convertStrDateToObDate("28/02/2020")).thenReturn(joinedDate);

		when(userUtil.isValidAge(dobDate)).thenReturn(true);

		when(joinedDate.before(dobDate)).thenReturn(false);

		when(userUtil.capitalizeWord("trong  ")).thenReturn("Trong");
		when(userUtil.capitalizeWord("bach  thanh")).thenReturn("Bach Thanh");

		when(userUtil.generatePrefixUsername(dto.getFirstName(), dto.getLastName())).thenReturn("trongbt");

		when(usersRepository.findByUsernameContaining("trongbt")).thenReturn(null);

		when(userUtil.generatePassword("trongbt", dto.getDob())).thenReturn("trongbt@28021990");

		when(usersRepository.count()).thenReturn(0l);

		when(userUtil.generateCode(1l)).thenReturn(code);

		when(userMapper.mapUserUpdateDtoToUser(dto, "trongbt", dobDate, joinedDate, code)).thenReturn(user);

		when(usersRepository.save(user)).thenReturn(user);
	}

	@Test
	void when_CheckValid_IdNotFound(){
		Long userId = 1L;
		Users user= new Users();
//		when(usersRepository.findUsersById(userId))
		assertEquals("Not Found",usersServiceImpl.checkValidAssigmentUser(userId));
	}

	@Test
	void whenCheckValid_UserByIsValidAsmSHouldReturn(){
		Long userId = 1L;
		Users user= new Users();
		when(usersRepository.findUsersById(userId)).thenReturn(user);
		List<Assignment> list = new ArrayList<>();
		Assignment asm = new Assignment();
		list.add(asm);
		when(assignmentRepository.checkAssignmentUserAssignedBy(userId)).thenReturn(list);
		assertEquals("1",usersServiceImpl.checkValidAssigmentUser(userId));
	}

	@Test
	void whenCheckValid_UserToIsValidAsmSHouldReturn(){
		Long userId = 1L;
		Users user= new Users();
		when(usersRepository.findUsersById(userId)).thenReturn(user);
		List<Assignment> list = new ArrayList<>();
		Assignment asm = new Assignment();
		list.add(asm);
		when(assignmentRepository.checkAssignmentUserAssignedTo(userId)).thenReturn(list);
		assertEquals("1",usersServiceImpl.checkValidAssigmentUser(userId));
	}
	@Test
	void whenCheckValid_UserhaveNotValidAsm(){
		Long userId = 1L;
		Users user= new Users();
		when(usersRepository.findUsersById(userId)).thenReturn(user);
		List<Assignment> list = new ArrayList<>();
		Assignment asm = new Assignment();
		list.add(asm);
//		when(assignmentRepository.findAllByStateIsAndAssignedTo("Accepted",user)).thenReturn(list);
		assertEquals("0",usersServiceImpl.checkValidAssigmentUser(userId));
	}


	@Test
	void whenDisableUserHaveHistory(){
		Long userId = 1L;
		Users user= new Users();
		when(usersRepository.findUsersById(userId)).thenReturn(user);
		assertEquals("User is hide",usersServiceImpl.disableUser(userId));
	}
//	endregion

}
