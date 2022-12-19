package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.request.asset.CreateAssetRequestDto;
import com.nashtech.rookies.dto.request.asset.UpdateAssetRequestDto;
import com.nashtech.rookies.dto.response.asset.AssetDetailResponseDto;
import com.nashtech.rookies.dto.response.asset.AssetResponseDto;
import com.nashtech.rookies.dto.response.report.ReportCategoryResponseDto;
import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.Category;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import com.nashtech.rookies.mapper.AssetMapper;
import com.nashtech.rookies.mapper.CategoryMapper;
import com.nashtech.rookies.repository.AssetRepository;
import com.nashtech.rookies.repository.AssignmentRepository;
import com.nashtech.rookies.repository.CategoryRepository;
import com.nashtech.rookies.repository.UsersRepository;
import com.nashtech.rookies.services.interfaces.AssetService;
import com.nashtech.rookies.utils.AssetUtil;
import com.nashtech.rookies.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService {

	AssetRepository assetRepository;
	CategoryRepository categoryRepository;
	AssignmentRepository assignmentRepository;
	CategoryMapper categoryMapper;
	AssetMapper assetMapper;
	UserUtil userUtil;
	AssetUtil assetUtil;
	UsersRepository usersRepository;

	@Autowired
	public AssetServiceImpl(AssetRepository assetRepository, UserUtil userUtil, CategoryRepository categoryRepository,
			CategoryMapper categoryMapper, AssetMapper assetMapper, AssetUtil assetUtil,
			AssignmentRepository assignmentRepository, UsersRepository usersRepository) {
		this.assetRepository = assetRepository;
		this.userUtil = userUtil;
		this.categoryRepository = categoryRepository;
		this.categoryMapper = categoryMapper;
		this.assetMapper = assetMapper;
		this.assetUtil = assetUtil;
		this.assignmentRepository = assignmentRepository;
		this.usersRepository = usersRepository;
	}

	// region Show information
	@Override
	public List<AssetResponseDto> showAll() {
		Long id = userUtil.getIdFromUserPrinciple();
		Users users = usersRepository.findUsersById(id);
		List<Asset> assetList = assetRepository.findByUsersOrderByCodeAsc(users);
		List<AssetResponseDto> assetDtoList = assetUtil.mapAssetToAssetDto(assetList);
		return assetDtoList;
	}

	public AssetDetailResponseDto getAssetDetailById(Long id) {
		Optional<Asset> assetOptional = assetRepository.findById(id);
		if (assetOptional.isEmpty()) {
			throw new InvalidDataInputException("Asset not found");
		}

		AssetDetailResponseDto result = assetMapper.mapToDetailDto(assetOptional.get());

		List<Assignment> assignmentList = assignmentRepository.findByAsset(assetOptional.get());

		result.setAssignments(assetUtil.mapAssetToAssetDetailDto(assignmentList));

		return result;
	}
	// endregion

	// region Create new asset
	@Override
	public AssetResponseDto createAsset(CreateAssetRequestDto dto) {

		if (!userUtil.isValidDate(dto.getInstalledDate())) {
			throw new InvalidDataInputException("Install date is invalid");
		}

		if (!("Available".equalsIgnoreCase(dto.getState())) && !("Not available".equalsIgnoreCase(dto.getState()))) {
			throw new InvalidDataInputException("State is invalid");
		}

		String code = "";

		Category category;

		Optional<Category> categoryOptional = categoryRepository.findByName(dto.getCategoryName());

		if (categoryOptional.isEmpty()) {
			category = categoryMapper.mapToCategory(dto.getCategoryName(), dto.getCategoryCode());

			category = categoryRepository.save(category);

			code = dto.getCategoryCode() + "000001";

		} else {
			category = categoryOptional.get();

			List<Asset> list = assetRepository.findByCategory(category);

			code = assetUtil.generateAssetCode(list, category.getCode());
		}

		Date installedDate = userUtil.convertStrDateToObDate(dto.getInstalledDate());

		String location = userUtil.getAddressFromUserPrinciple();

		Long id = userUtil.getIdFromUserPrinciple();

		Users user = usersRepository.findUsersById(id);

		Asset asset = assetMapper.mapToAsset(dto.getName(), code, dto.getSpecification(), dto.getState(), location,
				installedDate, category);

		asset.setUsers(user);

		asset = assetRepository.save(asset);

		return assetMapper.mapToDto(asset);
	}
	// endregion

	// region Update asset
	@Override
	public AssetResponseDto updateAsset(UpdateAssetRequestDto dto) {

		if (!userUtil.isValidDate(dto.getInstalledDate())) {
			throw new InvalidDataInputException("Install date is invalid");
		}

		Optional<Asset> assetOptional = assetRepository.findById(dto.getId());

		if (assetOptional.isEmpty()) {
			throw new InvalidDataInputException("Asset not found");
		}

		Asset asset = assetOptional.get();

		asset.setName(dto.getName());
		asset.setSpecification(dto.getSpecification());
		asset.setInstalledDate(userUtil.convertStrDateToObDate(dto.getInstalledDate()));
		asset.setState(dto.getState());

		asset = assetRepository.save(asset);

		return assetMapper.mapToDto(asset);
	}
	// endregion

	// region Delete asset

	@Override
	public boolean checkHasExistAssignment(Long id) {
		return assignmentRepository.existsAssignmentByAsset_Id(id);
	}

	@Override
	public void deleteAsset(Long id) throws Exception {
		Asset asset = assetRepository.findAssetById(id);

		if (asset == null) {
			throw new InvalidDataInputException("Asset not found");
		}

		if (asset.getState().equals("Assigned")) {
			throw new InvalidDataInputException("State of asset is assigned");
		}

		assetRepository.delete(asset);
	}
	// endregion

	@Override
	public List<AssetResponseDto> getAllAssetsByStateAndUser(String state) {

		Long userId = userUtil.getIdFromUserPrinciple();

		Optional<Users> userOptional = usersRepository.findById(userId);

		List<Asset> assetList = assetRepository.findByStateAndUsers(state, userOptional.get());

		List<AssetResponseDto> assetDtoList = assetUtil.mapAssetToAssetDto(assetList);

		return assetDtoList;
	}

	@Override
	public List<ReportCategoryResponseDto> getAllReport(){
		List<ReportCategoryResponseDto> responseDtos =assetRepository.getReport();
		if(responseDtos.isEmpty()){
			throw new InvalidDataInputException("List empty");
		}
		return responseDtos;
	}

}
