package com.nashtech.rookies.repository;

import com.nashtech.rookies.dto.response.report.ReportCategoryResponseDto;
import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Category;
import com.nashtech.rookies.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long>, JpaSpecificationExecutor<Asset> {
//    Show information of asset by id
    Asset findAssetById(Long id);

    List<Asset> findByCategory(Category category);
    
    List<Asset> findByUsersOrderByCodeAsc(Users users);
    
    List<Asset> findByStateAndUsers(String state, Users users);

    @Query(value = "select c.name as catename ,count(c.name) as total,count(c.name) filter (where a.state='Assigned') as assigned,count(c.name) filter (where a.state='Available') as available,count(c.name) filter (where a.state='Not available') as notAvailable,count(c.name) filter (where a.state='Waiting for recycling') as waitingForRecycling, count(c.name) filter (where a.state='Recycled') as recycled from asset a join category c ON a.category_id = c.id group by c.name order by c.name \n",nativeQuery = true)
    List<ReportCategoryResponseDto> getReport();
//    Create assets

//    Update assets

//    Delete assets

}