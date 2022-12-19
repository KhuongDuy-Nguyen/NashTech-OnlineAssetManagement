package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.dto.request.asset.CreateAssetRequestDto;
import com.nashtech.rookies.dto.request.asset.UpdateAssetRequestDto;
import com.nashtech.rookies.dto.response.asset.AssetDetailResponseDto;
import com.nashtech.rookies.dto.response.asset.AssetResponseDto;
import com.nashtech.rookies.dto.response.asset.AssignmentResponseDto;
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
import com.nashtech.rookies.utils.AssetUtil;
import com.nashtech.rookies.utils.UserUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AssetServiceImplTest {
	AssetRepository assetRepository;
	CategoryRepository categoryRepository;
	AssignmentRepository assignmentRepository;
	CategoryMapper categoryMapper;
	AssetMapper assetMapper;
	UserUtil userUtil;
	AssetUtil assetUtil;
	UsersRepository usersRepository;
	AssetServiceImpl assetServiceImpl;
	Asset initAsset;

	@BeforeEach
	void beforeEach() {
		assetRepository = mock(AssetRepository.class);
		categoryRepository = mock(CategoryRepository.class);
		assignmentRepository = mock(AssignmentRepository.class);
		categoryMapper = mock(CategoryMapper.class);
		assetMapper = mock(AssetMapper.class);
		userUtil = mock(UserUtil.class);

		assetUtil = mock(AssetUtil.class);

		usersRepository = mock(UsersRepository.class);

		assetServiceImpl = new AssetServiceImpl(assetRepository, userUtil, categoryRepository, categoryMapper,
				assetMapper, assetUtil, assignmentRepository, usersRepository);

		initAsset = mock(Asset.class);

		initAsset = Asset.builder().name("Name").id(1L).state("Available").build();

	}

	@Test
	void createAsset_ShouldThrowInvalidDataInputException_WhenInstalledDateInValid() {

		CreateAssetRequestDto dto = CreateAssetRequestDto.builder().installedDate("30/02/2020").build();

		when(userUtil.isValidDate("30/02/2022")).thenReturn(false);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.createAsset(dto);
		});
		assertEquals("Install date is invalid", actualException.getMessage());
	}

	@Test
	void createAsset_ShouldThrowInvalidDataInputException_WhenStateInValid() {

		CreateAssetRequestDto dto = CreateAssetRequestDto.builder().installedDate("22/02/1992").state("abcd").build();

		when(userUtil.isValidDate(dto.getInstalledDate())).thenReturn(true);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.createAsset(dto);
		});
		assertEquals("State is invalid", actualException.getMessage());
	}

	@Test
	void createAsset_ShouldReturnAsset_WhenCategoryIsNew() {
		Category category = mock(Category.class);
		Date installedDate = mock(Date.class);
		Asset asset = mock(Asset.class);
		AssetResponseDto expectedAsset = mock(AssetResponseDto.class);
		Users user = mock(Users.class);

		CreateAssetRequestDto dto = CreateAssetRequestDto.builder().installedDate("22/02/1992").state("Available")
				.categoryName("category").categoryCode("categoryCode").build();

		when(userUtil.isValidDate(dto.getInstalledDate())).thenReturn(true);
		when(categoryRepository.findByName(dto.getCategoryName())).thenReturn(Optional.empty());

		when(categoryMapper.mapToCategory(dto.getCategoryName(), dto.getCategoryCode())).thenReturn(category);
		when(categoryRepository.save(category)).thenReturn(category);

		when(userUtil.convertStrDateToObDate(dto.getInstalledDate())).thenReturn(installedDate);

		when(userUtil.getAddressFromUserPrinciple()).thenReturn("HCM");

		when(userUtil.getIdFromUserPrinciple()).thenReturn(2L);

		when(usersRepository.findUsersById(2L)).thenReturn(user);

		when(assetMapper.mapToAsset(dto.getName(), dto.getCategoryCode() + "000001", dto.getSpecification(),
				dto.getState(), "HCM", installedDate, category)).thenReturn(asset);

		when(assetRepository.save(asset)).thenReturn(asset);

		when(assetMapper.mapToDto(asset)).thenReturn(expectedAsset);

		AssetResponseDto actualAsset = assetServiceImpl.createAsset(dto);

		verify(asset).setUsers(user);

		assertThat(expectedAsset, is(actualAsset));
	}

	@Test
	void createAsset_ShouldReturnAsset_WhenCategoryIsAvailable() {
		Category category = mock(Category.class);
		Date installedDate = mock(Date.class);
		Asset asset = mock(Asset.class);
		AssetResponseDto expectedAsset = mock(AssetResponseDto.class);
		@SuppressWarnings("unchecked")
		List<Asset> listAsset = mock(List.class);
		Users user = mock(Users.class);

		CreateAssetRequestDto dto = CreateAssetRequestDto.builder().installedDate("22/02/1992").state("Not available")
				.categoryName("category").categoryCode("categoryCode").build();

		when(userUtil.isValidDate(dto.getInstalledDate())).thenReturn(true);
		when(categoryRepository.findByName(dto.getCategoryName())).thenReturn(Optional.of(category));

		when(assetRepository.findByCategory(category)).thenReturn(listAsset);
		when(assetUtil.generateAssetCode(listAsset, category.getCode())).thenReturn("categoryCode123");

		when(userUtil.convertStrDateToObDate(dto.getInstalledDate())).thenReturn(installedDate);

		when(userUtil.getAddressFromUserPrinciple()).thenReturn("HCM");

		when(userUtil.getIdFromUserPrinciple()).thenReturn(2L);

		when(usersRepository.findUsersById(2L)).thenReturn(user);

		when(assetMapper.mapToAsset(dto.getName(), "categoryCode123", dto.getSpecification(), dto.getState(), "HCM",
				installedDate, category)).thenReturn(asset);

		when(assetRepository.save(asset)).thenReturn(asset);
		when(assetMapper.mapToDto(asset)).thenReturn(expectedAsset);

		AssetResponseDto actualAsset = assetServiceImpl.createAsset(dto);

		verify(asset).setUsers(user);

		assertThat(expectedAsset, is(actualAsset));
	}

	// update

	@Test
	void updateAsset_ShouldThrowInvalidDataInputException_WhenInstalledDateInValid() {

		UpdateAssetRequestDto dto = UpdateAssetRequestDto.builder().installedDate("30/02/2020").build();

		when(userUtil.isValidDate("30/02/2022")).thenReturn(false);

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.updateAsset(dto);
		});
		assertEquals("Install date is invalid", actualException.getMessage());
	}

	@Test
	void updateAsset_ShouldThrowInvalidDataInputException_WhenIdInValid() {
		UpdateAssetRequestDto dto = UpdateAssetRequestDto.builder().id(2L).installedDate("18/02/2020").build();
		when(userUtil.isValidDate(dto.getInstalledDate())).thenReturn(true);

		when(assetRepository.findById(2L)).thenReturn(Optional.empty());

		InvalidDataInputException actualException = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.updateAsset(dto);
		});
		assertEquals("Asset not found", actualException.getMessage());
	}

	@Test
	void updateAsset_ShouldReturnAsset_WhenDataValid() {
		UpdateAssetRequestDto dto = UpdateAssetRequestDto.builder().id(2L).installedDate("18/02/2020").name("Name")
				.specification("Specification").state("Available").build();

		Asset asset = mock(Asset.class);

		AssetResponseDto expectedAsset = mock(AssetResponseDto.class);
		Date installedDate = mock(Date.class);

		when(userUtil.isValidDate(dto.getInstalledDate())).thenReturn(true);

		when(assetRepository.findById(2L)).thenReturn(Optional.of(asset));

		when(userUtil.convertStrDateToObDate(dto.getInstalledDate())).thenReturn(installedDate);

		when(assetRepository.save(asset)).thenReturn(asset);

		when(assetMapper.mapToDto(asset)).thenReturn(expectedAsset);

		AssetResponseDto actualAsset = assetServiceImpl.updateAsset(dto);

		verify(asset).setName("Name");

		verify(asset).setSpecification("Specification");

		verify(asset).setState("Available");

		verify(asset).setInstalledDate(installedDate);

		assertThat(expectedAsset, is(actualAsset));
	}

	// delete
	@Test
	void deleteAsset_ShouldRemoveAssets_WhenAssetsIsAvailable() throws Exception {
		when(assetRepository.findAssetById(1L)).thenReturn(initAsset);
		when(assignmentRepository.existsAssignmentByAsset_Id(1L)).thenReturn(false);

		assetServiceImpl.deleteAsset(1L);
		verify(assetRepository).delete(initAsset);
	}

	@Test
	void deleteAssets_ShouldThrowException_WhenNotFound() {
		when(assetRepository.findAssetById(1L)).thenReturn(null);

		InvalidDataInputException exception = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.deleteAsset(1L);
		});
		assertEquals("Asset not found", exception.getMessage());
	}

	@Test
	void checkHasExistAssignment_ShouldReturnTrue_WhenAssetIsAssigned() {
		long id = 1L;
		when(assetRepository.findAssetById(id)).thenReturn(initAsset);
		when(assignmentRepository.existsAssignmentByAsset_Id(id)).thenReturn(true);

		boolean actual = assetServiceImpl.checkHasExistAssignment(id);
		assertTrue(actual);
	}

	@Test
	void deleteAssets_ShouldThrowException_WhenStateIsAssigned() {
		initAsset = Asset.builder().name("Name").id(1L).state("Assigned").build();

		when(assetRepository.findAssetById(1L)).thenReturn(initAsset);
		when(assignmentRepository.existsAssignmentByAsset_Id(1L)).thenReturn(false);

		InvalidDataInputException exception = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.deleteAsset(1L);
		});
		assertEquals("State of asset is assigned", exception.getMessage());
	}

	@Test
	void getAllAssets_ShouldReturnAllAssetsManagedByUser() {
		Users user = mock(Users.class);
		when(userUtil.getIdFromUserPrinciple()).thenReturn(2L);
		when(usersRepository.findUsersById(2L)).thenReturn(user);

		List<Asset> assetList = new ArrayList<>();
		when(assetRepository.findByUsersOrderByCodeAsc(user)).thenReturn(assetList);
		List<AssetResponseDto> assetDtoList = new ArrayList<>();
		when(assetUtil.mapAssetToAssetDto(assetList)).thenReturn(assetDtoList);
		List<AssetResponseDto> actual = assetServiceImpl.showAll();
		assertEquals(assetDtoList, actual);
	}

	@Test
	void getAssetDetailById_ShouldReturnAssetDetail() {
		Asset asset = mock(Asset.class);
		when(assetRepository.findById(2L)).thenReturn(Optional.of(asset));

		AssetDetailResponseDto expectedAsset = mock(AssetDetailResponseDto.class);
		when(assetMapper.mapToDetailDto(asset)).thenReturn(expectedAsset);

		List<Assignment> assignmentList = new ArrayList<>();
		Assignment assignment = Assignment.builder().id(1L).build();
		assignmentList.add(assignment);
		when(assignmentRepository.findByAsset(asset)).thenReturn(assignmentList);
		List<AssignmentResponseDto> assignmentDtoList = new ArrayList<>();
		when(assetUtil.mapAssetToAssetDetailDto(assignmentList)).thenReturn(assignmentDtoList);
		AssetDetailResponseDto actualAsset = assetServiceImpl.getAssetDetailById(2L);
		verify(expectedAsset).setAssignments(assignmentDtoList);
		assertEquals(expectedAsset, actualAsset);
	}

	@Test
	void getAllAssetsByStateAndUser_ShouldReturnAllAssetsManagedByUser_WhenDataValid() {
		String state = "Available";
		Users user = mock(Users.class);

		when(userUtil.getIdFromUserPrinciple()).thenReturn(2L);
		when(usersRepository.findById(2L)).thenReturn(Optional.of(user));

		List<Asset> assetList = new ArrayList<>();
		when(assetRepository.findByStateAndUsers(state, user)).thenReturn(assetList);

		List<AssetResponseDto> assetDtoList = new ArrayList<>();
		when(assetUtil.mapAssetToAssetDto(assetList)).thenReturn(assetDtoList);

		List<AssetResponseDto> actual = assetServiceImpl.getAllAssetsByStateAndUser(state);
		assertEquals(assetDtoList, actual);
	}

	@Test
	void getAllReport_ShouldThrowException_WhenListEmpty(){
		List<ReportCategoryResponseDto> responseDtos = new ArrayList<>();
		InvalidDataInputException exception = assertThrows(InvalidDataInputException.class, () -> {
			assetServiceImpl.getAllReport();
		});
		assertEquals("List empty", exception.getMessage());
	}

	@Test
	void getAllReport_ShouldReturnData_WhenListNotEmpty(){
		List<ReportCategoryResponseDto> responseDtos = mock(List.class);
		when(assetRepository.getReport()).thenReturn(responseDtos);
		assertEquals(responseDtos,assetServiceImpl.getAllReport());
	}

}
