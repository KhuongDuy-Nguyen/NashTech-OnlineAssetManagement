package com.nashtech.rookies.dto.request.asset;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class UpdateAssetRequestDto {

	@NotNull(message = "Id is required.")
	private Long id;

	@NotBlank(message = "Name is required.")
	private String name;

	@NotBlank(message = "Specification is required.")
	private String specification;

	@NotBlank(message = "State is required.")
	private String state;

	@NotBlank(message = "InstalledDate is required.")
	private String installedDate;
}
