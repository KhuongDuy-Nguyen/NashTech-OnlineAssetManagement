package com.nashtech.rookies.services.interfaces;

import com.nashtech.rookies.dto.request.asset.CreateAssetRequestDto;
import com.nashtech.rookies.dto.request.asset.UpdateAssetRequestDto;
import com.nashtech.rookies.dto.response.asset.AssetDetailResponseDto;
import com.nashtech.rookies.dto.response.asset.AssetResponseDto;
import com.nashtech.rookies.dto.response.report.ReportCategoryResponseDto;

import java.util.List;

public interface AssetService {
	AssetResponseDto createAsset(CreateAssetRequestDto dto);

	List<AssetResponseDto> showAll();

	boolean checkHasExistAssignment(Long id);
	void deleteAsset(Long id) throws Exception;

	AssetResponseDto updateAsset(UpdateAssetRequestDto dto);

	AssetDetailResponseDto getAssetDetailById(Long id);

	List<AssetResponseDto> getAllAssetsByStateAndUser(String state);

	List<ReportCategoryResponseDto> getAllReport();
}
