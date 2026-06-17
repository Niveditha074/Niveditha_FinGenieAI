package com.fingenie.service;
 
import java.util.List;
import com.fingenie.dto.AccountDTO;
 
public interface AccountService {
 
    AccountDTO createAccount(AccountDTO accountDTO);
 
    AccountDTO getAccountById(Long accountId);
 
    List<AccountDTO> getAllAccounts();
    
    AccountDTO updateAccount(Long accountId,AccountDTO accountDTO);
 
    void deleteAccount(Long accountId);
}