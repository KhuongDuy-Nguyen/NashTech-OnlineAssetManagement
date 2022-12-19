package com.nashtech.rookies.repository;

import com.nashtech.rookies.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {

//    region Find all users by admin locations
    Users findUsersById(Long id);

//    Find all users by admin locations
	List<Users> findByLocationAndDisabledIsFalseOrderByCodeAsc(String location);

//    Sort users by JoinedDate
	List<Users> findByLocationOrderByJoinedDateDesc(String location);

	List<Users> findByLocationOrderByJoinedDateAsc(String location);

//    Sort users by code
	List<Users> findByLocationOrderByCodeDesc(String location);

	List<Users> findByLocationOrderByCodeAsc(String location);

//    Sort users by full name
	List<Users> findByLocationOrderByFullNameDesc(String location);

	List<Users> findByLocationOrderByFullNameAsc(String location);

//    Sort users by role
	List<Users> findByLocationOrderByRoleDesc(String location);


	List<Users> findByLocationOrderByRoleAsc(String location);

	List<Users> findByLocationOrderByUpdatedDateDesc(String location);

	Users findUsersByUsername(String username);

	Optional<Users> findByUsername(String username);

//    endregion

//    region Create users
    List<Users> findByUsernameContaining(String username);
//   endregion


}