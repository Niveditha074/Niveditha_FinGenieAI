package com.fingenie.service;
 
import com.fingenie.dto.AdminDTO;
import com.fingenie.dto.AdminLoginDTO;
 
public interface AdminService {
 
    AdminDTO registerAdmin(AdminDTO dto);
 
    String loginAdmin(AdminLoginDTO dto);
}