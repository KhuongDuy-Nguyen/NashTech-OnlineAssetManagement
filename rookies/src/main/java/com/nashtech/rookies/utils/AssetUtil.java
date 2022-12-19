package com.nashtech.rookies.utils;

import com.nashtech.rookies.dto.response.asset.AssetResponseDto;
import com.nashtech.rookies.dto.response.asset.AssignmentResponseDto;
import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.mapper.AssetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

@Component
public class AssetUtil {
	@Autowired
	AssetMapper assetMapper;

	public String generateAssetCode(List<Asset> list, String categoryCode) {
		if (list.isEmpty()) {
			return categoryCode + "000001";
		}

		List<String> assetCodes = list.stream().map(Asset::getCode).collect(Collectors.toList());
		List<Integer> suffixAssetCodes = assetCodes.stream()
				.map(code -> Integer.parseInt(code.substring(categoryCode.length()))).collect(Collectors.toList());

		OptionalInt maxInt = suffixAssetCodes.stream().mapToInt(v -> v).max();

		Integer max = maxInt.getAsInt() + 1;

		String assetCode;

		if (max < 10) {
			assetCode = categoryCode + "00000" + max;
		} else if (max < 100) {
			assetCode = categoryCode + "0000" + max;
		} else if (max < 1000) {
			assetCode = categoryCode + "000" + max;
		} else if (max < 10000) {
			assetCode = categoryCode + "00" + max;
		} else if (max < 100000) {
			assetCode = categoryCode + "0" + max;
		} else {
			assetCode = categoryCode + +max;
		}

		return assetCode;
	}

	public List<AssetResponseDto> mapAssetToAssetDto(List<Asset> list) {
		List<AssetResponseDto> dtoList = new ArrayList<>();
		for (Asset asset : list) {
			AssetResponseDto assetDto = assetMapper.mapToDto(asset);
			dtoList.add(assetDto);
		}
		return dtoList;
	}

	public List<AssignmentResponseDto> mapAssetToAssetDetailDto(List<Assignment> list) {
		List<AssignmentResponseDto> assignmentDtoList = new ArrayList<>();
		for (Assignment assignment : list) {
			AssignmentResponseDto data = new AssignmentResponseDto();
			data.setReturnDate(assignment.getReturnedDate());
			data.setAssignedTo(assignment.getAssignedTo().getUsername());
			data.setAssignedBy(assignment.getAssignedBy().getUsername());
			data.setAssignedDate(assignment.getAssignedDate());
			assignmentDtoList.add(data);
		}
		return assignmentDtoList;
	}
}
