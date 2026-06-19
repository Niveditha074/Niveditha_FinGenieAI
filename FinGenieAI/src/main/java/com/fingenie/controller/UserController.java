package com.fingenie.controller;
 
import java.util.List;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import com.fingenie.dto.UserDTO;
import com.fingenie.service.UserService;
 
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
 
    private final UserService userService;
 
    @PostMapping
    public ResponseEntity<UserDTO> registerUser(
            @Valid @RequestBody UserDTO dto){
 
        return ResponseEntity.ok(
                userService.registerUser(dto));
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(
            @PathVariable Long id){
 
        return ResponseEntity.ok(
                userService.getUserById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @RequestBody UserDTO dto) {
     
        return ResponseEntity.ok(
                userService.updateUser(id, dto));
    }
 
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(){
 
        return ResponseEntity.ok(
                userService.getAllUsers());
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id){
 
        userService.deleteUser(id);
 
        return ResponseEntity.ok(
                "User Deleted Successfully");
    }
}
