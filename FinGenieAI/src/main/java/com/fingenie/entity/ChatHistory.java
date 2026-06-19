package com.fingenie.entity;
 
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name="chat_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatHistory {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long chatId;
 
    private String userMessage;
 
    private String botReply;
 
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}