package com.nashtech.rookies.controller;

import com.nashtech.rookies.dto.request.user.UpdateUserRequestDto;
import com.nashtech.rookies.dto.request.user.UserRequestDto;
import com.nashtech.rookies.entity.Assignment;
import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.services.interfaces.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/v1/users")
@RestController
public class UsersController {

    @Autowired
    UsersService usersService;

//    Show information
    @GetMapping
    public ResponseEntity<?> showAllUsers() throws Exception {
        return ResponseEntity.ok(usersService.showAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok().body(usersService.findByUserId(id));
    }

//    Create user
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequestDto dto) {
    	return ResponseEntity.ok().body(usersService.createUser(dto));
    }

//    Update user
    @PutMapping
    public Users updateUser(@Valid @RequestBody UpdateUserRequestDto dto){ return usersService.updateUser(dto);}

//    Delete user
    @DeleteMapping
    public String disableUser(@RequestParam Long id){
        return usersService.disableUser(id);
    }

    @GetMapping("/check-assignment")
    public String checkValidUser(@RequestParam Long userId){
        return usersService.checkValidAssigmentUser(userId);
    }

    @GetMapping("/getAll/{id}")
    public List<Assignment> getAllAsmByUserId(@PathVariable Long id){
        return usersService.getAllByUserIdGetAsm(id);
    }
}
