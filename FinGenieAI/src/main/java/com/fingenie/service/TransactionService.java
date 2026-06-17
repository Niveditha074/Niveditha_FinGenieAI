package com.fingenie.service;
 
import java.util.List;
import com.fingenie.dto.TransactionDTO;
 
public interface TransactionService {
 
    TransactionDTO createTransaction(TransactionDTO dto);
 
    TransactionDTO getTransactionById(Long id);
 
    List<TransactionDTO> getAllTransactions();
}