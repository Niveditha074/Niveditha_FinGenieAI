package com.fingenie.dto;
 
import jakarta.validation.constraints.*;
import lombok.*;
 
@Data
public class AccountDTO {
 
    private Long accountId;
 
    private String accountNumber;
 
    @NotBlank
    private String accountType;
 
    @PositiveOrZero
    private Double balance;
 
    private Long userId;
}