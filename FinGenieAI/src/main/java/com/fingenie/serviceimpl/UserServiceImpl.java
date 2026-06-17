package com.fingenie.serviceimpl;
 
import java.util.List;
import java.util.stream.Collectors;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.UserDTO;
import com.fingenie.entity.User;
import com.fingenie.exception.ResourceNotFoundException;
import com.fingenie.repository.UserRepository;
import com.fingenie.service.UserService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class UserServiceImpl
        implements UserService {
 
    private final UserRepository userRepository;
 
    @Override
    public UserDTO registerUser(UserDTO dto) {
 
        User user = User.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .role(dto.getRole())
                .active(true)
                .build();
 
        User saved =
                userRepository.save(user);
 
        dto.setUserId(saved.getUserId());
 
        return dto;
    }
 
    @Override
    public UserDTO getUserById(Long id) {
 
        User user =
                userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User Not Found"));
 
        UserDTO dto =
                new UserDTO();
 
        dto.setUserId(user.getUserId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole());
 
        return dto;
    }
 
    @Override
    public List<UserDTO> getAllUsers() {
 
        return userRepository.findAll()
                .stream()
                .map(user -> {
                    UserDTO dto =
                            new UserDTO();
 
                    dto.setUserId(
                            user.getUserId());
 
                    dto.setFullName(
                            user.getFullName());
 
                    dto.setEmail(
                            user.getEmail());
                    dto.setPhoneNumber(user.getPhoneNumber());
                    dto.setRole(user.getRole());
 
                    return dto;
                })
                .collect(Collectors.toList());
    }
    @Override
    public UserDTO updateUser(Long id, UserDTO dto) {
     
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));
     
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setRole(dto.getRole());
     
        User updatedUser = userRepository.save(user);
     
        UserDTO response = new UserDTO();
     
        response.setUserId(updatedUser.getUserId());
        response.setFullName(updatedUser.getFullName());
        response.setEmail(updatedUser.getEmail());
        response.setPhoneNumber(updatedUser.getPhoneNumber());
        response.setRole(updatedUser.getRole());
     
        return response;
    }
 
    @Override
    public void deleteUser(Long id) {
 
        userRepository.deleteById(id);
    }
}