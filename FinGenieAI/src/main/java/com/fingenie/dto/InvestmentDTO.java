package com.fingenie.dto;
 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
 
@Data
public class InvestmentDTO {
 
    private Long investmentId;
 
    @NotBlank
    private String fundName;
 
    @Positive
    private Double amount;
 
    private String riskLevel;
 
    private Long userId;
}