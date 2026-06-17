package com.fingenie.service;
 
import java.util.List;
import com.fingenie.dto.UserDTO;
 
public interface UserService {
 
    UserDTO registerUser(UserDTO userDTO);
 
    UserDTO getUserById(Long userId);
 
    List<UserDTO> getAllUsers();
 
    UserDTO updateUser(Long userId, UserDTO userDTO);
 
    void deleteUser(Long userId);
}