package com.fingenie.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.fingenie.entity.ChatHistory;
 
public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {
 
    List<ChatHistory> findByUserUserId(Long userId);
}