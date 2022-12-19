package com.nashtech.rookies.dto.request.asset;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class CreateAssetRequestDto {

	@NotBlank(message = "Name is required.")
	private String name;

	@NotBlank(message = "Specification is required.")
	private String specification;

	@NotBlank(message = "State is required.")
	private String state;

	@NotBlank(message = "InstalledDate is required.")
	private String installedDate;

	@NotBlank(message = "CategoryName is required.")
	private String categoryName;

	@NotBlank(message = "CategoryCode is required.")
	private String categoryCode;
}
