package com.fingenie.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fingenie.dto.RegisterDTO;
import com.fingenie.entity.User;
import com.fingenie.repository.UserRepository;
import com.fingenie.security.JwtUtil;
import com.fingenie.serviceimpl.AuthServiceImpl;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void register_ShouldRegisterUserSuccessfully() {

        RegisterDTO dto = new RegisterDTO();
        dto.setFullName("John Doe");
        dto.setEmail("john@example.com");
        dto.setPassword("1234");
        dto.setPhoneNumber("9876543210");
        dto.setRole("USER");

        when(userRepository.existsByEmail(dto.getEmail()))
                .thenReturn(false);

        String result = authService.register(dto);

        assertEquals(
                "User Registered Successfully",
                result);

        verify(userRepository, times(1))
                .save(any(User.class));
    }

    @Test
    void register_ShouldThrowException_WhenEmailAlreadyExists() {

        RegisterDTO dto = new RegisterDTO();
        dto.setEmail("john@example.com");

        when(userRepository.existsByEmail(dto.getEmail()))
                .thenReturn(true);

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> authService.register(dto));

        assertEquals(
                "Email already exists",
                exception.getMessage());
    }

    @Test
    void login_ShouldReturnToken_WhenCredentialsAreValid() {

        User user = User.builder()
                .userId(1L)
                .email("john@example.com")
                .password("1234")
                .build();

        when(userRepository.findByEmail("john@example.com"))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken("john@example.com"))
                .thenReturn("jwt-token");

        String token =
                authService.login(
                        "john@example.com",
                        "1234");

        assertEquals("jwt-token", token);

        verify(jwtUtil, times(1))
                .generateToken("john@example.com");
    }

    @Test
    void login_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findByEmail("john@example.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> authService.login(
                                "john@example.com",
                                "1234"));

        assertEquals(
                "User not found",
                exception.getMessage());
    }

    @Test
    void login_ShouldThrowException_WhenPasswordIsInvalid() {

        User user = User.builder()
                .userId(1L)
                .email("john@example.com")
                .password("correctPassword")
                .build();

        when(userRepository.findByEmail("john@example.com"))
                .thenReturn(Optional.of(user));

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> authService.login(
                                "john@example.com",
                                "wrongPassword"));

        assertEquals(
                "Invalid Password",
                exception.getMessage());
    }
}