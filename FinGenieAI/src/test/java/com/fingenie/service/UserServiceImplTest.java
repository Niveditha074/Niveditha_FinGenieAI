package com.fingenie.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fingenie.dto.UserDTO;
import com.fingenie.entity.User;
import com.fingenie.exception.ResourceNotFoundException;
import com.fingenie.repository.UserRepository;
import com.fingenie.serviceimpl.UserServiceImpl;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;
    private UserDTO userDTO;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .userId(1L)
                .fullName("John Doe")
                .email("john@example.com")
                .phoneNumber("9876543210")
                .role("USER")
                .active(true)
                .build();

        userDTO = new UserDTO();
        userDTO.setUserId(1L);
        userDTO.setFullName("John Doe");
        userDTO.setEmail("john@example.com");
        userDTO.setPhoneNumber("9876543210");
        userDTO.setRole("USER");
    }

    @Test
    void registerUser_ShouldRegisterUserSuccessfully() {

        when(userRepository.save(any(User.class)))
                .thenReturn(user);

        UserDTO result =
                userService.registerUser(userDTO);

        assertNotNull(result);
        assertEquals(1L, result.getUserId());

        verify(userRepository, times(1))
                .save(any(User.class));
    }

    @Test
    void getUserById_ShouldReturnUser() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        UserDTO result =
                userService.getUserById(1L);

        assertNotNull(result);
        assertEquals("John Doe",
                result.getFullName());
        assertEquals("john@example.com",
                result.getEmail());
    }

    @Test
    void getUserById_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResourceNotFoundException exception =
                assertThrows(
                        ResourceNotFoundException.class,
                        () -> userService.getUserById(1L));

        assertEquals(
                "User Not Found",
                exception.getMessage());
    }

    @Test
    void getAllUsers_ShouldReturnAllUsers() {

        when(userRepository.findAll())
                .thenReturn(Arrays.asList(user));

        List<UserDTO> result =
                userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("John Doe",
                result.get(0).getFullName());
    }

    @Test
    void getAllUsers_ShouldReturnEmptyList() {

        when(userRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<UserDTO> result =
                userService.getAllUsers();

        assertTrue(result.isEmpty());
    }

    @Test
    void updateUser_ShouldUpdateUser() {

        User updatedUser = User.builder()
                .userId(1L)
                .fullName("Updated User")
                .email("updated@example.com")
                .phoneNumber("9999999999")
                .role("ADMIN")
                .active(true)
                .build();

        UserDTO updateDTO = new UserDTO();
        updateDTO.setFullName("Updated User");
        updateDTO.setEmail("updated@example.com");
        updateDTO.setPhoneNumber("9999999999");
        updateDTO.setRole("ADMIN");

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(userRepository.save(any(User.class)))
                .thenReturn(updatedUser);

        UserDTO result =
                userService.updateUser(1L, updateDTO);

        assertNotNull(result);
        assertEquals("Updated User",
                result.getFullName());
        assertEquals("updated@example.com",
                result.getEmail());
        assertEquals("ADMIN",
                result.getRole());
    }

    @Test
    void updateUser_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResourceNotFoundException exception =
                assertThrows(
                        ResourceNotFoundException.class,
                        () -> userService.updateUser(1L, userDTO));

        assertEquals(
                "User Not Found",
                exception.getMessage());
    }

    @Test
    void deleteUser_ShouldDeleteUser() {

        doNothing().when(userRepository)
                .deleteById(1L);

        userService.deleteUser(1L);

        verify(userRepository, times(1))
                .deleteById(1L);
    }
}