package com.fingenie.serviceimpl;
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.ChatHistoryDTO;
import com.fingenie.entity.ChatHistory;
import com.fingenie.entity.User;
import com.fingenie.repository.ChatHistoryRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.service.ChatHistoryService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class ChatHistoryServiceImpl implements ChatHistoryService {
 
    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;
 
    @Override
    public ChatHistoryDTO saveChat(ChatHistoryDTO dto) {
 
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
 
        ChatHistory chat = ChatHistory.builder()
                .userMessage(dto.getUserMessage())
                .botReply(dto.getBotReply())
                .user(user)
                .build();
 
        ChatHistory saved = chatHistoryRepository.save(chat);
 
        dto.setChatId(saved.getChatId());
 
        return dto;
    }
 
    @Override
    public List<ChatHistoryDTO> getAllChats() {
 
        return chatHistoryRepository.findAll()
                .stream()
                .map(chat -> {
                    ChatHistoryDTO dto = new ChatHistoryDTO();
                    dto.setChatId(chat.getChatId());
                    dto.setUserMessage(chat.getUserMessage());
                    dto.setBotReply(chat.getBotReply());
                    dto.setUserId(chat.getUser().getUserId());
                    return dto;
                })
                .toList();
    }
}