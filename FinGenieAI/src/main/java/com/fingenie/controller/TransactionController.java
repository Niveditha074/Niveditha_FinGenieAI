package com.fingenie.controller;
 
import java.util.List;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.fingenie.dto.TransactionDTO;
import com.fingenie.service.TransactionService;
 
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
 
    private final TransactionService transactionService;
 
    @PostMapping
    public ResponseEntity<TransactionDTO>
    saveTransaction(
            @Valid @RequestBody TransactionDTO dto){
 
        return ResponseEntity.ok(
                transactionService.createTransaction(dto));
    }
 
    @GetMapping
    public ResponseEntity<List<TransactionDTO>>
    getTransactions(){
 
        return ResponseEntity.ok(
                transactionService.getAllTransactions());
    }
    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(
            @PathVariable Long id) {
     
        return ResponseEntity.ok(
                transactionService.getTransactionById(id));
    }
}