package com.fingenie.controller;
 
import java.util.List;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import com.fingenie.dto.InvestmentDTO;
import com.fingenie.service.InvestmentService;
 
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/investments")
@RequiredArgsConstructor
public class InvestmentController {
 
    private final InvestmentService investmentService;
 
    @PostMapping
    public ResponseEntity<InvestmentDTO> saveInvestment(
            @Valid @RequestBody InvestmentDTO dto) {
 
        return ResponseEntity.ok(
                investmentService
                        .saveInvestment(dto));
    }
 
    @GetMapping
    public ResponseEntity<List<InvestmentDTO>>
            getAllInvestments() {
 
        return ResponseEntity.ok(
                investmentService
                        .getAllInvestments());
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<InvestmentDTO>
            getInvestmentById(
            @PathVariable Long id) {
 
        return ResponseEntity.ok(
                investmentService
                        .getInvestmentById(id));
    }
 
    @PutMapping("/{id}")
    public ResponseEntity<InvestmentDTO>
            updateInvestment(
            @PathVariable Long id,
            @RequestBody InvestmentDTO dto) {
 
        return ResponseEntity.ok(
                investmentService
                        .updateInvestment(
                                id,
                                dto));
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<String>
            deleteInvestment(
            @PathVariable Long id) {
 
        investmentService
                .deleteInvestment(id);
 
        return ResponseEntity.ok(
                "Investment deleted successfully");
    }
}