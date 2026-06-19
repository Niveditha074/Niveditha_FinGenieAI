package com.fingenie.service;
 
import java.util.List;
import com.fingenie.dto.LoanDTO;
 
public interface LoanService {
 
    LoanDTO applyLoan(LoanDTO loanDTO);
 
    LoanDTO getLoanById(Long loanId);
 
    List<LoanDTO> getAllLoans();
}