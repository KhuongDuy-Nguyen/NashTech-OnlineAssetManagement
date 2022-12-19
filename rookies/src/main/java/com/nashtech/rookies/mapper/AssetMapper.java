package com.nashtech.rookies.mapper;

import com.nashtech.rookies.dto.response.asset.AssetDetailResponseDto;
import com.nashtech.rookies.dto.response.asset.AssetResponseDto;
import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Category;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class AssetMapper {
	public Asset mapToAsset(String name, String code, String specification, String state, String location,
			Date installedDate, Category category) {
		
		return Asset.builder()
				.name(name)
				.code(code)
				.specification(specification)
				.state(state)
				.location(location)
				.installedDate(installedDate)
				.category(category)
				.build();
	}

	public AssetResponseDto mapToDto(Asset asset) {
		
		return AssetResponseDto.builder()
				.id(asset.getId())
				.name(asset.getName())
				.specification(asset.getSpecification())
				.categoryName(asset.getCategory().getName())
				.installedDate(asset.getInstalledDate())
				.state(asset.getState())
				.code(asset.getCode())
				.build();
	}
	
public AssetDetailResponseDto mapToDetailDto(Asset asset) {
		
		return AssetDetailResponseDto.builder()
				.id(asset.getId())
				.name(asset.getName())
				.specification(asset.getSpecification())
				.categoryName(asset.getCategory().getName())
				.installedDate(asset.getInstalledDate())
				.state(asset.getState())
				.code(asset.getCode())
				.location(asset.getLocation())
				.build();
	}
//	public List<ReportCategoryResponseDto> mapReportToDto (List<Object> listReport){
//		List<ReportCategoryResponseDto> responseDtos =new ArrayList<>();
//		for (Object o:listReport) {
//
//		}
//		return null;
//	}

	
}
