package com.fingenie.dto;
 
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
 
@Data
public class ChatHistoryDTO {
 
    private Long chatId;
 
    @NotBlank
    private String userMessage;
 
    private String botReply;
 
    private Long userId;
}