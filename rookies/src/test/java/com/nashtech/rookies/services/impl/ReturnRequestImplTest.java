package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.response.returnRequest.ReturnRequestDto;
import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.ReturnRequest;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import com.nashtech.rookies.mapper.ReturnRequestMapper;
import com.nashtech.rookies.repository.AssignmentRepository;
import com.nashtech.rookies.repository.ReturnRequestRepository;
import com.nashtech.rookies.repository.UsersRepository;
import com.nashtech.rookies.security.userprincal.UserPrinciple;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ReturnRequestImplTest {
	ReturnRequestRepository returnRequestRepository;
	AssignmentRepository assignmentRepository;
	ReturnRequestMapper returnRequestMapper;
	UsersRepository usersRepository;
	Authentication authentication;

	UserPrinciple userPrinciple;
	ReturnRequestServiceImpl returnRequestServiceImpl;

	@BeforeEach
	void beforeEach() {
		assignmentRepository = mock(AssignmentRepository.class);
		usersRepository = mock(UsersRepository.class);
		userPrinciple = mock(UserPrinciple.class);
		authentication = mock(Authentication.class);
		returnRequestMapper = mock(ReturnRequestMapper.class);
		returnRequestRepository = mock(ReturnRequestRepository.class);
		returnRequestServiceImpl = new ReturnRequestServiceImpl(returnRequestRepository, assignmentRepository,
				returnRequestMapper, usersRepository);
	}

	@Test
	void createReturnRequest_ShouldReturnException_WhenASMIsNull() {
		Long id = 1L;
		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.createReturnRequest(id);
		});
		assertEquals("Not found this assignment", actualException.getMessage());
	}

	@Test
	void createReturnRequest_ShouldReturnException_WhenStateNotCorrect() {
		Long id = 1L;
//        Authentication authentication = mock(Authentication.class);
//        SecurityContext securityContext = mock(SecurityContext.class);
//        UserPrinciple userPrinciple1 = new UserPrinciple();
//        when(securityContext.getAuthentication()).thenReturn(authentication);
//        SecurityContextHolder.setContext(securityContext);
//        when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		Assignment assignment = new Assignment();
		Optional<Assignment> checkAssignment = Optional.of(assignment);
		when(assignmentRepository.findById(id)).thenReturn(checkAssignment);
		assignment = checkAssignment.get();
		assignment.setState("123");
		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.createReturnRequest(id);
		});
		assertEquals("State must be Accepted", actualException.getMessage());
	}

	@Test
	void createReturnRequest_ShouldReturnException_WhenAssetAlreadyReturned() {
		Long id = 1L;

		Assignment assignment = new Assignment();
		Optional<Assignment> checkAssignment = Optional.of(assignment);
		when(assignmentRepository.findById(id)).thenReturn(checkAssignment);
		assignment = checkAssignment.get();
		assignment.setState("Accepted");
		assignment.setCheckReturn(true);
		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.createReturnRequest(id);
		});
		assertEquals("This asset is returned", actualException.getMessage());
	}

	@Test
	void createReturnRequest_ShouldReturnRequestDto_WhenDataValid() {
		Long id = 1L;
		Users user = mock(Users.class);
		ReturnRequestDto dto = mock(ReturnRequestDto.class);
		Assignment assignment = new Assignment();
		assignment.setId(id);
		assignment.setState("Accepted");
		assignment.setCheckReturn(false);
		Optional<Assignment> checkAssignment = Optional.of(assignment);
		when(assignmentRepository.findById(id)).thenReturn(checkAssignment);
//        assignment=checkAssignment.get();
		Authentication authentication = mock(Authentication.class);
		SecurityContext securityContext = mock(SecurityContext.class);
		UserPrinciple userPrinciple1 = new UserPrinciple();
		when(securityContext.getAuthentication()).thenReturn(authentication);
		SecurityContextHolder.setContext(securityContext);
		when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		when(usersRepository.findUsersById(userPrinciple1.getId())).thenReturn(user);
		ReturnRequest returnRequest = new ReturnRequest();
		ReturnRequest newRequest = new ReturnRequest();

		returnRequest.setAssignment(assignment);
		returnRequest.setState("Waiting for returning");
//        assignment.setCheckReturn(true);
		returnRequest.setRequestBy(user.getUsername());
		when(returnRequestRepository.save(any())).thenReturn(newRequest);
		when(returnRequestMapper.mapToReturnRequestDto(newRequest)).thenReturn(dto);
		ReturnRequestDto actual = returnRequestServiceImpl.createReturnRequest(id);
		assertEquals(actual, dto);
	}

	@Test
	void getAllReturnRequests_ShouldReturnException_WhenListReturnIsEmpty() {
		List<ReturnRequest> returnList = new ArrayList<ReturnRequest>();

		when(returnRequestRepository.findAll()).thenReturn(returnList);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.getAllReturnRequests();
		});
		assertEquals("Return List is empty", actualException.getMessage());
	}

	@Test
	void getAllReturnRequests_ShouldReturnListRequest_WhenDataValid() {
		List<ReturnRequest> returnList = new ArrayList<ReturnRequest>();
		List<ReturnRequestDto> expected = new ArrayList<ReturnRequestDto>();
		ReturnRequest request = ReturnRequest.builder().id(2l).build();

		returnList.add(request);

		when(returnRequestRepository.findAll()).thenReturn(returnList);
		when(returnRequestMapper.mapToListReturnRequestDto(returnList)).thenReturn(expected);

		List<ReturnRequestDto> actual = returnRequestServiceImpl.getAllReturnRequests();

		assertThat(expected, is(actual));

	}

	@Test
	void deleteReturnRequests_ShouldThrowInvalidDataInputException_WhenIdInvalid() {

		when(returnRequestRepository.findById(2l)).thenReturn(Optional.empty());

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.deleteReturnRequest(2l);
		});
		assertEquals("ReturnRequest not found", actualException.getMessage());
	}
	
	@Test
	void deleteReturnRequests_ShouldThrowInvalidDataInputException_WhenStateInvalid() {
		ReturnRequest returnRequest = ReturnRequest.builder().state("ABC").build();

		when(returnRequestRepository.findById(2l)).thenReturn(Optional.of(returnRequest));

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.deleteReturnRequest(2l);
		});
		assertEquals("ReturnRequest State must be Waiting for returning", actualException.getMessage());
	}
	
	@Test
	void deleteReturnRequests_ShouldReturnData_WhenDataValid() {
		ReturnRequest returnRequest = ReturnRequest.builder().state("Waiting for returning")
				.assignment(Assignment.builder().build())
				.build();

		when(returnRequestRepository.findById(2l)).thenReturn(Optional.of(returnRequest));
		
		returnRequestServiceImpl.deleteReturnRequest(2l);

		verify(returnRequestRepository).delete(returnRequest);
	}
	
	@Test
	void updateReturnRequest_ShouldThrowInvalidDataInputException_WhenReturnRequestInvalid() {
		when(returnRequestRepository.findById(2l)).thenReturn(Optional.empty());

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.updateReturnRequest(2l);
		});
		assertEquals("ReturnRequest not found", actualException.getMessage());	
	}

	@Test
	void updateReturnRequest_ShouldThrowInvalidDataInputException_WhenStateInvalid() {
		ReturnRequest returnRequest = ReturnRequest.builder().state("ABC").build();

		when(returnRequestRepository.findById(2l)).thenReturn(Optional.of(returnRequest));

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			returnRequestServiceImpl.updateReturnRequest(2l);
		});
		assertEquals("ReturnRequest State must be Waiting for returning", actualException.getMessage());
	}
	
	@Test
	void updateReturnRequests_ShouldReturnData_WhenDataValid() {
		ReturnRequest returnRequest = mock(ReturnRequest.class);
		Assignment assignment = mock(Assignment.class);
		Asset asset = mock(Asset.class);
		ReturnRequestDto expected = mock(ReturnRequestDto.class);
	
		Authentication authentication = mock(Authentication.class);
		SecurityContext securityContext = mock(SecurityContext.class);
		UserPrinciple userPrinciple1 = new UserPrinciple();
		SecurityContextHolder.setContext(securityContext);
		
		ArgumentCaptor<Date> dateCaptor = ArgumentCaptor.forClass(Date.class);
		
		when(returnRequestRepository.findById(2l)).thenReturn(Optional.of(returnRequest));
		when(returnRequest.getState()).thenReturn("Waiting for returning");
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userPrinciple1);
		when(returnRequest.getAssignment()).thenReturn(assignment);
		when(returnRequest.getAssignment().getAsset()).thenReturn(asset);
		when(returnRequestMapper.mapToReturnRequestDto(returnRequest)).thenReturn(expected);
		
		ReturnRequestDto actual = returnRequestServiceImpl.updateReturnRequest(2l);
		
		verify(returnRequest).setState("Completed");
		verify(returnRequest).setReturnDate(dateCaptor.capture());
		verify(returnRequest).setAcceptedBy(userPrinciple1.getUsername());
		verify(assignment).setComplete(true);
		verify(assignment).setCheckReturn(true);
		verify(asset).setState("Available");
		verify(returnRequestRepository).save(returnRequest);
		
		assertThat(actual, is(expected));
		
		
		
	}
}
