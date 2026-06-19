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
 
import com.fingenie.dto.LoanDTO;
import com.fingenie.service.LoanService;
 
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {
 
    private final LoanService loanService;
 
    @PostMapping("/apply")
    public ResponseEntity<LoanDTO>
    applyLoan(
            @Valid @RequestBody LoanDTO dto){
 
        return ResponseEntity.ok(
                loanService.applyLoan(dto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<LoanDTO> getLoanById(
            @PathVariable Long id) {
     
        return ResponseEntity.ok(
                loanService.getLoanById(id));
    }
    @GetMapping
    public ResponseEntity<List<LoanDTO>>
            getAllLoans() {
     
        return ResponseEntity.ok(
                loanService.getAllLoans());
    }
}
