package com.nashtech.rookies.repository;

import com.nashtech.rookies.entity.Asset;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
//    Show information of assignment by id
    Assignment findAssignmentById(Long id);
    boolean existsAssignmentByAsset_Id(Long id);

   @Query(value = "select * from assignment a where a.assigned_by_id =?1 and a.state = 'Accepted'  and a.is_complete = false",nativeQuery = true)
    List<Assignment> checkAssignmentUserAssignedBy(Long id);
   @Query(value = "select * from assignment a where a.assigned_to_id =?1 and a.state = 'Accepted'  and a.is_complete = false",nativeQuery = true)
   List<Assignment> checkAssignmentUserAssignedTo(Long id);
    List<Assignment> findAllByAssignedTo(Users userGetAsm);
    List<Assignment> findByAsset(Asset asset);

    @Query(value = "select a.* from assignment a join asset a2 on a.asset_id =a2.id where a.assigned_date <=  ?1  and a.assigned_to_id =?2 and a.state != 'Declined' and a.is_complete = false order by a2.code  ASC ",nativeQuery = true)
    List<Assignment> getAllAssignmentOfUser(Timestamp date,Long id);

    @Query("select a from Assignment a where a.asset.location = ?1")
    List<Assignment> findByAssetLocation(String location);

}