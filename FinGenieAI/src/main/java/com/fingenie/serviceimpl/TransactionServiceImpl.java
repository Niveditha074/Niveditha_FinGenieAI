package com.fingenie.serviceimpl;
 
import java.time.LocalDateTime;
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.TransactionDTO;
import com.fingenie.entity.Account;
import com.fingenie.entity.Transaction;
import com.fingenie.repository.AccountRepository;
import com.fingenie.repository.TransactionRepository;
import com.fingenie.service.TransactionService;
import com.fingenie.entity.FraudAlert;
import com.fingenie.repository.FraudAlertRepository;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
 
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final FraudAlertRepository fraudAlertRepository;
 
    @Override
    public TransactionDTO createTransaction(TransactionDTO dto) {
 
        Account account = accountRepository.findById(dto.getAccountId())
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));
 
        Transaction transaction = Transaction.builder()
                .amount(dto.getAmount())
                .transactionType(dto.getTransactionType())
                .description(dto.getDescription())
                .transactionDate(LocalDateTime.now())
                .account(account)
                .build();
 
        Transaction saved = transactionRepository.save(transaction);
        
     // Auto Fraud Detection
     if(saved.getAmount() > 50000) {
      
         FraudAlert fraudAlert = FraudAlert.builder()
                 .riskScore(90.0)
                 .remarks("Large Transaction Detected : ₹" + saved.getAmount())
                 .status("HIGH")
                 .transaction(saved)
                 .build();
      
         fraudAlertRepository.save(fraudAlert);
     }
      
     dto.setTransactionId(saved.getTransactionId());
      
     return dto;
    }
 
    @Override
    public TransactionDTO getTransactionById(Long id) {
 
        Transaction transaction =
                transactionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Transaction not found"));
 
        TransactionDTO dto = new TransactionDTO();
 
        dto.setTransactionId(transaction.getTransactionId());
        dto.setAmount(transaction.getAmount());
        dto.setTransactionType(transaction.getTransactionType());
        dto.setDescription(transaction.getDescription());
 
        if (transaction.getAccount() != null) {
            dto.setAccountId(
                    transaction.getAccount().getAccountId());
        }
 
        return dto;
    }
 
    @Override
    public List<TransactionDTO> getAllTransactions() {
 
        return transactionRepository.findAll()
                .stream()
                .map(transaction -> {
 
                    TransactionDTO dto = new TransactionDTO();
 
                    dto.setTransactionId(
                            transaction.getTransactionId());
 
                    dto.setAmount(
                            transaction.getAmount());
 
                    dto.setTransactionType(
                            transaction.getTransactionType());
 
                    dto.setDescription(
                            transaction.getDescription());
 
                    if (transaction.getAccount() != null) {
                        dto.setAccountId(
                                transaction.getAccount()
                                        .getAccountId());
                    }
 
                    return dto;
                })
                .toList();
    }
}