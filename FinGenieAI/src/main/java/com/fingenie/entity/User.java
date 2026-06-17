package com.fingenie.entity;
 
import java.time.LocalDateTime;
import java.util.List;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
 
    @Column(nullable=false)
    private String fullName;
 
    @Column(unique=true,nullable=false)
    private String email;
 
    @Column(nullable=false)
    private String password;
 
    @Column(unique=true)
    private String phoneNumber;
 
    private String role;
 
    private Boolean active;
 
    private LocalDateTime createdAt;
 
    @OneToMany(mappedBy="user",
            cascade=CascadeType.ALL)
    private List<Account> accounts;
 
    @OneToMany(mappedBy="user",
            cascade=CascadeType.ALL)
    private List<Loan> loans;
 
    @OneToMany(mappedBy="user",
            cascade=CascadeType.ALL)
    private List<Investment> investments;
 
    @OneToMany(mappedBy="user",
            cascade=CascadeType.ALL)
    private List<ChatHistory> chats;
}