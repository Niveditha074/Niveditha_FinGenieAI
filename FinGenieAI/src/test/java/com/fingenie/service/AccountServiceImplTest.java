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

import com.fingenie.dto.AccountDTO;
import com.fingenie.entity.Account;
import com.fingenie.entity.User;
import com.fingenie.repository.AccountRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.serviceimpl.AccountServiceImpl;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AccountServiceImpl accountService;

    private User user;
    private Account account;
    private AccountDTO accountDTO;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .userId(1L)
                .build();

        account = Account.builder()
                .accountId(100L)
                .accountNumber("ACC123456")
                .accountType("Savings")
                .balance(1000.0)
                .user(user)
                .build();

        accountDTO = new AccountDTO();
        accountDTO.setAccountId(100L);
        accountDTO.setAccountType("Savings");
        accountDTO.setBalance(1000.0);
        accountDTO.setUserId(1L);
    }

    @Test
    void createAccount_ShouldCreateAccountSuccessfully() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(accountRepository.save(any(Account.class)))
                .thenReturn(account);

        AccountDTO result = accountService.createAccount(accountDTO);

        assertNotNull(result);
        assertEquals("Savings", result.getAccountType());
        assertEquals(1000.0, result.getBalance());
    }

    @Test
    void createAccount_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> accountService.createAccount(accountDTO));

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void getAccountById_ShouldReturnAccount() {

        when(accountRepository.findById(100L))
                .thenReturn(Optional.of(account));

        AccountDTO result = accountService.getAccountById(100L);

        assertNotNull(result);
        assertEquals(100L, result.getAccountId());
        assertEquals("Savings", result.getAccountType());
    }

    @Test
    void getAccountById_ShouldThrowException_WhenAccountNotFound() {

        when(accountRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> accountService.getAccountById(100L));

        assertEquals("Account not found", exception.getMessage());
    }

    @Test
    void getAllAccounts_ShouldReturnAllAccounts() {

        when(accountRepository.findAll())
                .thenReturn(Arrays.asList(account));

        List<AccountDTO> result = accountService.getAllAccounts();

        assertEquals(1, result.size());
        assertEquals("Savings",
                result.get(0).getAccountType());
    }

    @Test
    void getAllAccounts_ShouldReturnEmptyList() {

        when(accountRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<AccountDTO> result = accountService.getAllAccounts();

        assertTrue(result.isEmpty());
    }

    @Test
    void deleteAccount_ShouldDeleteAccount() {

        when(accountRepository.findById(100L))
                .thenReturn(Optional.of(account));

        accountService.deleteAccount(100L);

        verify(accountRepository, times(1))
                .delete(account);
    }

    @Test
    void deleteAccount_ShouldThrowException_WhenAccountNotFound() {

        when(accountRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> accountService.deleteAccount(100L));

        assertEquals("Account not found", exception.getMessage());
    }

    @Test
    void updateAccount_ShouldUpdateAccount() {

        Account updatedAccount = Account.builder()
                .accountId(100L)
                .accountNumber("ACC123456")
                .accountType("Current")
                .balance(5000.0)
                .user(user)
                .build();

        AccountDTO updateDTO = new AccountDTO();
        updateDTO.setAccountType("Current");
        updateDTO.setBalance(5000.0);

        when(accountRepository.findById(100L))
                .thenReturn(Optional.of(account));

        when(accountRepository.save(any(Account.class)))
                .thenReturn(updatedAccount);

        AccountDTO result =
                accountService.updateAccount(100L, updateDTO);

        assertNotNull(result);
        assertEquals("Current", result.getAccountType());
        assertEquals(5000.0, result.getBalance());
    }

    @Test
    void updateAccount_ShouldThrowException_WhenAccountNotFound() {

        when(accountRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> accountService.updateAccount(100L, accountDTO));

        assertEquals("Account not found", exception.getMessage());
    }
}