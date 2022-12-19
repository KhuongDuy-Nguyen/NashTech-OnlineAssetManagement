package com.nashtech.rookies.services.interfaces;

import com.nashtech.rookies.dto.response.returnRequest.ReturnRequestDto;

import java.util.List;

public interface ReturnRequestService {
	// Create new return request
	ReturnRequestDto createReturnRequest(Long id);

	List<ReturnRequestDto> getAllReturnRequests();

	void deleteReturnRequest(Long id);
	
	ReturnRequestDto updateReturnRequest(Long id);
}
