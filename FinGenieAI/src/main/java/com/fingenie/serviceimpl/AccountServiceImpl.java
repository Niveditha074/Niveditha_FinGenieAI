package com.fingenie.serviceimpl;
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.AccountDTO;
import com.fingenie.entity.Account;
import com.fingenie.entity.User;
import com.fingenie.repository.AccountRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.service.AccountService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
 
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
 
    @Override
    public AccountDTO createAccount(AccountDTO dto) {
 
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
 
        Account account = Account.builder()
                .accountNumber(
                        "ACC" + System.currentTimeMillis())
                .accountType(dto.getAccountType())
                .balance(dto.getBalance())
                .user(user)
                .build();
 
        Account saved = accountRepository.save(account);
 
        AccountDTO response = new AccountDTO();
 
        response.setAccountId(saved.getAccountId());
        response.setAccountNumber(saved.getAccountNumber());
        response.setAccountType(saved.getAccountType());
        response.setBalance(saved.getBalance());
        response.setUserId(saved.getUser().getUserId());
 
        return response;
    }
 
    @Override
    public AccountDTO getAccountById(Long accountId) {
 
        Account account =
                accountRepository.findById(accountId)
                        .orElseThrow(() ->
                                new RuntimeException("Account not found"));
 
        AccountDTO dto = new AccountDTO();
 
        dto.setAccountId(account.getAccountId());
        dto.setAccountNumber(account.getAccountNumber());
        dto.setAccountType(account.getAccountType());
        dto.setBalance(account.getBalance());
 
        if (account.getUser() != null) {
            dto.setUserId(
                    account.getUser().getUserId());
        }
 
        return dto;
    }
 
    @Override
    public List<AccountDTO> getAllAccounts() {
 
        return accountRepository.findAll()
                .stream()
                .map(account -> {
 
                    AccountDTO dto = new AccountDTO();
 
                    dto.setAccountId(account.getAccountId());
                    dto.setAccountNumber(
                            account.getAccountNumber());
                    dto.setAccountType(
                            account.getAccountType());
                    dto.setBalance(
                            account.getBalance());
 
                    if (account.getUser() != null) {
                        dto.setUserId(
                                account.getUser()
                                       .getUserId());
                    }
 
                    return dto;
                })
                .toList();
    }
 
    @Override
    public void deleteAccount(Long accountId) {
 
        Account account =
                accountRepository.findById(accountId)
                        .orElseThrow(() ->
                                new RuntimeException("Account not found"));
 
        accountRepository.delete(account);
    }
    @Override
    public AccountDTO updateAccount(
            Long accountId,
            AccountDTO accountDTO) {
     
        Account account = accountRepository
                .findById(accountId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Account not found"));
     
        account.setAccountType(
                accountDTO.getAccountType());
     
        account.setBalance(
                accountDTO.getBalance());
     
        Account updated =
                accountRepository.save(account);
     
        AccountDTO dto = new AccountDTO();
     
        dto.setAccountId(
                updated.getAccountId());
     
        dto.setAccountType(
                updated.getAccountType());
     
        dto.setBalance(
                updated.getBalance());
     
        dto.setUserId(
                updated.getUser().getUserId());
     
        return dto;
    }
}