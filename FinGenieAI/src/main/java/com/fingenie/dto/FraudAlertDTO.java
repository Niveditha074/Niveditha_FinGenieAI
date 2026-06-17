package com.fingenie.dto;
 
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
 
@Data
public class FraudAlertDTO {
 
    private Long fraudId;
 
    @PositiveOrZero
    private Double riskScore;
 
    private String remarks;
 
    private String status;
 
    private Long transactionId;
}