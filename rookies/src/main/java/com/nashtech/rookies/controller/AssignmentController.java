package com.nashtech.rookies.controller;

import com.nashtech.rookies.dto.request.assignment.CreateAssignmentDto;
import com.nashtech.rookies.dto.request.assignment.UpdateAssignmentDto;
import com.nashtech.rookies.services.interfaces.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/v1/assignments")
@RestController
public class AssignmentController {

	@Autowired
	AssignmentService assignmentService;

//	Create assignment
	@PostMapping
	public ResponseEntity<?> createAssignment(@Valid @RequestBody CreateAssignmentDto dto) {
		return ResponseEntity.ok().body(assignmentService.createAssignment(dto));
	}

//	Update assignment

	@PutMapping
	public ResponseEntity<?> updateAssignment(@Valid @RequestBody UpdateAssignmentDto dto) {
		return ResponseEntity.ok().body(assignmentService.updateAssignment(dto));
	}

	@GetMapping("update/{id}")
	public ResponseEntity<?> getUpdateAssignmentById(@PathVariable Long id) {
		return ResponseEntity.ok().body(assignmentService.getUpdateAssignmentById(id));
	}

	@PutMapping("accept/{id}")
	public ResponseEntity<?> acceptAssignment(@PathVariable Long id) {
		return ResponseEntity.ok().body(assignmentService.acceptAssignment(id));
	}

	@PutMapping("decline/{id}")
	public ResponseEntity<?> declinedAssignment(@PathVariable Long id) {
		return ResponseEntity.ok().body(assignmentService.declinedAssignment(id));
	}

	@GetMapping
	public ResponseEntity<?> getAssignmentOfUser() {
		return ResponseEntity.ok().body(assignmentService.getListAssignmentofUser());
	}

	@GetMapping("/admin")
	public ResponseEntity<?> getAssignmentOfAdmin() {
		return ResponseEntity.ok().body(assignmentService.getListAssignmentofAdmin());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAssignmentDetails(@PathVariable Long id) {
		return ResponseEntity.ok().body(assignmentService.getAssignmentDetail(id));
	}
	
	@DeleteMapping()
	public ResponseEntity<?> deleteAssign(@RequestParam Long id) throws Exception {
		assignmentService.deleteAssignment(id);
		return ResponseEntity.ok().body("Delete successfully");
	}
}
