package com.fingenie.entity;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="loans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Loan {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long loanId;
 
    private String loanType;
 
    private Double amount;
 
    private Double salary;
 
    private Integer creditScore;
 
    private String status;
 
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}