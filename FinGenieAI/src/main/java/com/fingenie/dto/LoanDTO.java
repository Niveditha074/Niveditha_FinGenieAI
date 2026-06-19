package com.fingenie.dto;
 
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
 
@Data
public class LoanDTO {
 
    private Long loanId;
 
    @NotBlank
    private String loanType;
 
    @Positive
    private Double amount;
 
    @Positive
    private Double salary;
 
    @Min(300)
    @Max(900)
    private Integer creditScore;
 
    private String status;
 
    private Long userId;
}