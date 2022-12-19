package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.response.returnRequest.ReturnRequestDto;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.ReturnRequest;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import com.nashtech.rookies.mapper.ReturnRequestMapper;
import com.nashtech.rookies.repository.AssignmentRepository;
import com.nashtech.rookies.repository.ReturnRequestRepository;
import com.nashtech.rookies.repository.UsersRepository;
import com.nashtech.rookies.security.userprincal.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReturnRequestServiceImpl implements com.nashtech.rookies.services.interfaces.ReturnRequestService {
	ReturnRequestRepository returnRequestRepository;
	AssignmentRepository assignmentRepository;
	ReturnRequestMapper returnRequestMapper;
	UsersRepository usersRepository;

	@Autowired
	public ReturnRequestServiceImpl(ReturnRequestRepository returnRequestRepository,
			AssignmentRepository assignmentRepository, ReturnRequestMapper returnRequestMapper,
			UsersRepository usersRepository) {
		this.returnRequestRepository = returnRequestRepository;
		this.assignmentRepository = assignmentRepository;
		this.returnRequestMapper = returnRequestMapper;
		this.usersRepository = usersRepository;
	}

//    Get information of return request
	@Override
	public List<ReturnRequestDto> getAllReturnRequests() {
		List<ReturnRequest> returnList = returnRequestRepository.findAll();
		if (returnList.isEmpty()) {
			throw new InvalidDataInputException("Return List is empty");
		}
		return returnRequestMapper.mapToListReturnRequestDto(returnList);
	}

//    Create new return request
	@Override
	public ReturnRequestDto createReturnRequest(Long id) {
		Optional<Assignment> checkAsm = assignmentRepository.findById(id);
		if (!checkAsm.isPresent()) {
			throw new InvalidDataInputException("Not found this assignment");
		}
		Assignment assignment = checkAsm.get();

		if (!assignment.getState().equals("Accepted")) {
			throw new InvalidDataInputException("State must be Accepted");
		}
		if (assignment.isCheckReturn() == true) {
			throw new InvalidDataInputException("This asset is returned");
		}
		UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		Users users = usersRepository.findUsersById(userPrinciple.getId());
		ReturnRequest returnRequest = new ReturnRequest();
		returnRequest.setAssignment(assignment);
		returnRequest.setState("Waiting for returning");
		assignment.setCheckReturn(true);
		returnRequest.setRequestBy(users.getUsername());
		assignmentRepository.save(assignment);
		ReturnRequest newReturnRequest = returnRequestRepository.save(returnRequest);
		return returnRequestMapper.mapToReturnRequestDto(newReturnRequest);
	}
//    Update return request

//    Delete return request

	@Override
	public void deleteReturnRequest(Long id) {
		Optional<ReturnRequest> returnRequestOptional = returnRequestRepository.findById(id);

		if (returnRequestOptional.isEmpty()) {
			throw new InvalidDataInputException("ReturnRequest not found");
		}

		ReturnRequest returnRequest = returnRequestOptional.get();

		if (!"Waiting for returning".equals(returnRequest.getState())) {
			throw new InvalidDataInputException("ReturnRequest State must be Waiting for returning");
		}

		returnRequest.getAssignment().setCheckReturn(false);

		returnRequestRepository.delete(returnRequest);

	}

	@Override
	public ReturnRequestDto updateReturnRequest(Long id) {
		Date currentDate =  new Date();
		Optional<ReturnRequest> returnRequestOptional = returnRequestRepository.findById(id);

		if (returnRequestOptional.isEmpty()) {
			throw new InvalidDataInputException("ReturnRequest not found");
		}

		ReturnRequest returnRequest = returnRequestOptional.get();

		if (!"Waiting for returning".equals(returnRequest.getState())) {
			throw new InvalidDataInputException("ReturnRequest State must be Waiting for returning");
		}
		
		UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		
		returnRequest.setState("Completed");
		returnRequest.setReturnDate(currentDate);
		returnRequest.setAcceptedBy(userPrinciple.getUsername());
		returnRequest.getAssignment().setComplete(true);
		returnRequest.getAssignment().setCheckReturn(true);
		returnRequest.getAssignment().getAsset().setState("Available");
		returnRequestRepository.save(returnRequest);
		
		return returnRequestMapper.mapToReturnRequestDto(returnRequest);
	}

}
