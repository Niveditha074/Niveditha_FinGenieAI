package com.fingenie.entity;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name = "admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
 
    @Column(nullable = false)
    private String adminName;
 
    @Column(nullable = false, unique = true)
    private String email;
 
    @Column(nullable = false)
    private String password;
}