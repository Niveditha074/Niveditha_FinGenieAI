package com.fingenie.entity;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="investments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Investment {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long investmentId;
 
    private String fundName;
 
    private Double amount;
 
    private String riskLevel;
 
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}