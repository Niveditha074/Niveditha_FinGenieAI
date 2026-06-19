package com.fingenie.entity;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="fraud_alerts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FraudAlert {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long fraudId;
 
    private Double riskScore;
 
    private String remarks;
 
    private String status;
 
    @OneToOne
    @JoinColumn(name="transaction_id")
    private Transaction transaction;
}