package com.fingenie.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fingenie.dto.ChatHistoryDTO;
import com.fingenie.entity.ChatHistory;
import com.fingenie.entity.User;
import com.fingenie.repository.ChatHistoryRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.serviceimpl.ChatHistoryServiceImpl;

@ExtendWith(MockitoExtension.class)
class ChatHistoryServiceImplTest {

    @Mock
    private ChatHistoryRepository chatHistoryRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ChatHistoryServiceImpl chatHistoryService;

    private User user;
    private ChatHistory chatHistory;
    private ChatHistoryDTO chatHistoryDTO;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .userId(1L)
                .build();

        chatHistory = ChatHistory.builder()
                .chatId(100L)
                .userMessage("Hello")
                .botReply("Hi, how can I help you?")
                .user(user)
                .build();

        chatHistoryDTO = new ChatHistoryDTO();
        chatHistoryDTO.setChatId(100L);
        chatHistoryDTO.setUserMessage("Hello");
        chatHistoryDTO.setBotReply("Hi, how can I help you?");
        chatHistoryDTO.setUserId(1L);
    }

    @Test
    void saveChat_ShouldSaveChatSuccessfully() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(chatHistoryRepository.save(any(ChatHistory.class)))
                .thenReturn(chatHistory);

        ChatHistoryDTO result =
                chatHistoryService.saveChat(chatHistoryDTO);

        assertNotNull(result);
        assertEquals(100L, result.getChatId());

        verify(chatHistoryRepository, times(1))
                .save(any(ChatHistory.class));
    }

    @Test
    void saveChat_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> chatHistoryService.saveChat(chatHistoryDTO));

        assertEquals(
                "User not found",
                exception.getMessage());
    }

    @Test
    void getAllChats_ShouldReturnAllChats() {

        when(chatHistoryRepository.findAll())
                .thenReturn(Arrays.asList(chatHistory));

        List<ChatHistoryDTO> result =
                chatHistoryService.getAllChats();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(
                "Hello",
                result.get(0).getUserMessage());
        assertEquals(
                "Hi, how can I help you?",
                result.get(0).getBotReply());
    }

    @Test
    void getAllChats_ShouldReturnEmptyList() {

        when(chatHistoryRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<ChatHistoryDTO> result =
                chatHistoryService.getAllChats();

        assertTrue(result.isEmpty());
    }
}