package com.fingenie.controller;
 
import java.util.List;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
 
import com.fingenie.dto.AccountDTO;
import com.fingenie.service.AccountService;
 
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
 
    private final AccountService accountService;
 
    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(
            @Valid @RequestBody AccountDTO dto) {
 
        return ResponseEntity.ok(
                accountService.createAccount(dto));
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccount(
            @PathVariable Long id) {
 
        return ResponseEntity.ok(
                accountService.getAccountById(id));
    }
 
    @GetMapping
    public ResponseEntity<List<AccountDTO>>
            getAllAccounts() {
 
        return ResponseEntity.ok(
                accountService.getAllAccounts());
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(
            @PathVariable Long id) {
 
        accountService.deleteAccount(id);
 
        return ResponseEntity.ok(
                "Account deleted successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<AccountDTO> updateAccount(
            @PathVariable Long id,
            @RequestBody AccountDTO dto) {
     
        return ResponseEntity.ok(
                accountService.updateAccount(
                        id,
                        dto));
    }
}