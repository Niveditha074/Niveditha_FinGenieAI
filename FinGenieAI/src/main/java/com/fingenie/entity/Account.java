package com.fingenie.entity;
 
import java.util.List;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long accountId;
 
    @Column(unique=true)
    private String accountNumber;
 
    private String accountType;
 
    private Double balance;
 
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
 
    @OneToMany(mappedBy="account",
            cascade=CascadeType.ALL)
    private List<Transaction> transactions;
}