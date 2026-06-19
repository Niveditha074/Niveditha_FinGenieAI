package com.fingenie.dto;
 
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
 
    @NotBlank(message = "Full Name is required")
    private String fullName;
 
    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;
 
    @NotBlank(message = "Password is required")
    private String password;
 
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must be 10 digits"
    )
    private String phoneNumber;
 
    @NotBlank(message = "Role is required")
    private String role;
}