package com.fingenie.controller;
 
import java.util.List;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.fingenie.dto.AccountDTO;
import com.fingenie.dto.FraudAlertDTO;
import com.fingenie.dto.InvestmentDTO;
import com.fingenie.dto.LoanDTO;
import com.fingenie.dto.TransactionDTO;
import com.fingenie.dto.UserDTO;
import com.fingenie.service.AccountService;
import com.fingenie.service.FraudAlertService;
import com.fingenie.service.InvestmentService;
import com.fingenie.service.LoanService;
import com.fingenie.service.TransactionService;
import com.fingenie.service.UserService;
 
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
 
    private final UserService userService;
    private final AccountService accountService;
    private final TransactionService transactionService;
    private final LoanService loanService;
    private final InvestmentService investmentService;
    private final FraudAlertService fraudAlertService;
 
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
 
        return ResponseEntity.ok(
                userService.getAllUsers());
    }
 
    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
 
        return ResponseEntity.ok(
                accountService.getAllAccounts());
    }
 
    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionDTO>>
            getAllTransactions() {
 
        return ResponseEntity.ok(
                transactionService.getAllTransactions());
    }
 
    @GetMapping("/loans")
    public ResponseEntity<List<LoanDTO>> getAllLoans() {
 
        return ResponseEntity.ok(
                loanService.getAllLoans());
    }
 
    @GetMapping("/investments")
    public ResponseEntity<List<InvestmentDTO>>
            getAllInvestments() {
 
        return ResponseEntity.ok(
                investmentService.getAllInvestments());
    }
 
    @GetMapping("/fraud-alerts")
    public ResponseEntity<List<FraudAlertDTO>>
            getAllFraudAlerts() {
 
        return ResponseEntity.ok(
                fraudAlertService.getAllFraudAlerts());
    }
}