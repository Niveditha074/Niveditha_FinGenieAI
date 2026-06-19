package com.fingenie.dto;
 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
 
@Data
public class TransactionDTO {
 
    private Long transactionId;
 
    @Positive
    private Double amount;
 
    @NotBlank
    private String transactionType;
 
    private String description;
 
    private Long accountId;
}