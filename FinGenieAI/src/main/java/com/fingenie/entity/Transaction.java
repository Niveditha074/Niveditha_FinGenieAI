package com.fingenie.entity;
 
import java.time.LocalDateTime;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long transactionId;
 
    private Double amount;
 
    private String transactionType;
 
    private String description;
 
    private LocalDateTime transactionDate;
 
    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;
 
    @OneToOne(mappedBy="transaction",
            cascade=CascadeType.ALL)
    private FraudAlert fraudAlert;
}
 
 