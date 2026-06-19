package com.fingenie.service;
 
import com.fingenie.dto.RegisterDTO;
 
public interface AuthService {
 
    String login(String email, String password);
 
    String register(RegisterDTO dto);
}