package com.fingenie.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.fingenie.entity.Transaction;
 
public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {
 
    List<Transaction> findByAccountAccountId(Long accountId);
}