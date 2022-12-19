package com.nashtech.rookies.services.interfaces;

import com.nashtech.rookies.dto.request.user.UpdateUserRequestDto;
import com.nashtech.rookies.dto.request.user.UserRequestDto;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.Users;

import java.util.List;

public interface UsersService {
    //    Find all users by admin locations
    List<Users> showAll() throws Exception;

    //    Show information of user by id
    Users findByUserId(Long userId) throws Exception;

    //    Sort users by JoinedDate
    List<Users> sortByJoinedDateDesc();

    List<Users> sortByJoinedDateAsc();

    //    Sort users by code
    List<Users> sortByCodeDesc();

    List<Users> sortByCodeAsc();

    //    Sort users by full name
    List<Users> sortByFullNameDesc();

    List<Users> sortByFullNameAsc();

    //    Sort users by role with locations

    List<Users> sortByRoleDesc();

    List<Users> sortByRoleAsc();

    List<Users> sortByUpdatedDateDesc();

    Users createUser(UserRequestDto dto);

    Users updateUser(UpdateUserRequestDto userUpdateDto);

    String checkValidAssigmentUser(Long userId);

    String disableUser(Long userId);

    List<Assignment> getAllByUserIdGetAsm(Long userId);
}
