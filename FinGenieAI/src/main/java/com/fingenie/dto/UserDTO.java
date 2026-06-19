package com.fingenie.dto;
 
import jakarta.validation.constraints.*;
import lombok.*;
 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
 
    private Long userId;
 
    @NotBlank(message="Name required")
    private String fullName;
 
    @Email(message="Invalid Email")
    private String email;
 
    @Pattern(
            regexp="^[0-9]{10}$",
            message="Phone must be 10 digits")
    private String phoneNumber;
 
    private String role;
}