package com.fingenie.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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

import com.fingenie.dto.TransactionDTO;
import com.fingenie.entity.Account;
import com.fingenie.entity.Transaction;
import com.fingenie.repository.AccountRepository;
import com.fingenie.repository.FraudAlertRepository;
import com.fingenie.repository.TransactionRepository;
import com.fingenie.serviceimpl.TransactionServiceImpl;

@ExtendWith(MockitoExtension.class)
class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private FraudAlertRepository fraudAlertRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private Account account;
    private Transaction transaction;
    private TransactionDTO transactionDTO;

    @BeforeEach
    void setUp() {

        account = Account.builder()
                .accountId(1L)
                .accountNumber("ACC12345")
                .build();

        transaction = Transaction.builder()
                .transactionId(100L)
                .amount(20000.0)
                .transactionType("DEBIT")
                .description("Shopping")
                .account(account)
                .build();

        transactionDTO = new TransactionDTO();
        transactionDTO.setAccountId(1L);
        transactionDTO.setAmount(20000.0);
        transactionDTO.setTransactionType("DEBIT");
        transactionDTO.setDescription("Shopping");
    }

    @Test
    void createTransaction_ShouldCreateTransactionSuccessfully() {

        when(accountRepository.findById(1L))
                .thenReturn(Optional.of(account));

        when(transactionRepository.save(any(Transaction.class)))
                .thenReturn(transaction);

        TransactionDTO result =
                transactionService.createTransaction(transactionDTO);

        assertNotNull(result);

        verify(transactionRepository, times(1))
                .save(any(Transaction.class));

        verify(fraudAlertRepository, never())
                .save(any());
    }

    @Test
    void createTransaction_ShouldCreateFraudAlert_WhenAmountGreaterThan50000() {

        Transaction highValueTransaction = Transaction.builder()
                .transactionId(101L)
                .amount(75000.0)
                .transactionType("DEBIT")
                .description("Large Transfer")
                .account(account)
                .build();

        TransactionDTO highValueDTO =
                new TransactionDTO();

        highValueDTO.setAccountId(1L);
        highValueDTO.setAmount(75000.0);
        highValueDTO.setTransactionType("DEBIT");
        highValueDTO.setDescription("Large Transfer");

        when(accountRepository.findById(1L))
                .thenReturn(Optional.of(account));

        when(transactionRepository.save(any(Transaction.class)))
                .thenReturn(highValueTransaction);

        TransactionDTO result =
                transactionService.createTransaction(highValueDTO);

        assertNotNull(result);

        verify(fraudAlertRepository, times(1))
                .save(any());
    }

    @Test
    void createTransaction_ShouldThrowException_WhenAccountNotFound() {

        when(accountRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> transactionService.createTransaction(transactionDTO));

        assertEquals(
                "Account not found",
                exception.getMessage());
    }

    @Test
    void getTransactionById_ShouldReturnTransaction() {

        when(transactionRepository.findById(100L))
                .thenReturn(Optional.of(transaction));

        TransactionDTO result =
                transactionService.getTransactionById(100L);

        assertNotNull(result);
        assertEquals(100L, result.getTransactionId());
        assertEquals(20000.0, result.getAmount());
        assertEquals("DEBIT", result.getTransactionType());
        assertEquals("Shopping", result.getDescription());
    }

    @Test
    void getTransactionById_ShouldThrowException_WhenTransactionNotFound() {

        when(transactionRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> transactionService.getTransactionById(100L));

        assertEquals(
                "Transaction not found",
                exception.getMessage());
    }

    @Test
    void getAllTransactions_ShouldReturnAllTransactions() {

        when(transactionRepository.findAll())
                .thenReturn(Arrays.asList(transaction));

        List<TransactionDTO> result =
                transactionService.getAllTransactions();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(
                "Shopping",
                result.get(0).getDescription());
    }

    @Test
    void getAllTransactions_ShouldReturnEmptyList() {

        when(transactionRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<TransactionDTO> result =
                transactionService.getAllTransactions();

        assertTrue(result.isEmpty());
    }
}
