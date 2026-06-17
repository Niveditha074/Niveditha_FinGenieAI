package com.fingenie.service;
 
import java.util.List;
import com.fingenie.dto.ChatHistoryDTO;
 
public interface ChatHistoryService {
 
    ChatHistoryDTO saveChat(
            ChatHistoryDTO dto);
 
    List<ChatHistoryDTO> getAllChats();
}