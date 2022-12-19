package com.nashtech.rookies.controller;

import com.nashtech.rookies.dto.request.asset.CreateAssetRequestDto;
import com.nashtech.rookies.dto.request.asset.UpdateAssetRequestDto;
import com.nashtech.rookies.dto.response.report.ReportCategoryResponseDto;
import com.nashtech.rookies.services.interfaces.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/v1/assets")
@RestController
public class AssetController {

	@Autowired
	AssetService assetService;

//	Show information
	@GetMapping
	public ResponseEntity<?> showAllAssets() {
		return ResponseEntity.ok(assetService.showAll());
	}

	@GetMapping("/getByStateAndUser")
	public ResponseEntity<?> getAllAssetsByStateAndUsers(
			@RequestParam(name = "state", defaultValue = "Available") String state) {
		return ResponseEntity.ok(assetService.getAllAssetsByStateAndUser(state));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAssetDetailById(@PathVariable Long id) {
		return ResponseEntity.ok().body(assetService.getAssetDetailById(id));
	}

//	Create asset
	@PostMapping
	public ResponseEntity<?> createAsset(@Valid @RequestBody CreateAssetRequestDto dto) {
		return ResponseEntity.ok().body(assetService.createAsset(dto));
	}

//	Update asset
	@PutMapping
	public ResponseEntity<?> updateAsset(@Valid @RequestBody UpdateAssetRequestDto dto) {
		return ResponseEntity.ok().body(assetService.updateAsset(dto));
	}

//	Delete asset
	@DeleteMapping("/checkHasExistAssignment")
	public ResponseEntity<?> checkExistAssign(@RequestParam Long id) {
		return ResponseEntity.ok().body(assetService.checkHasExistAssignment(id));
	}

	@DeleteMapping()
	public ResponseEntity<?> deleteAssign(@RequestParam Long id) throws Exception {
		assetService.deleteAsset(id);
		return ResponseEntity.ok().body("Delete successfully");
	}

	@GetMapping("/report")
	public List<ReportCategoryResponseDto> reportList(){
		return assetService.getAllReport();
	}

}
