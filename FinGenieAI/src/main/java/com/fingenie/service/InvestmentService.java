package com.fingenie.service;
 
import java.util.List;
 
import com.fingenie.dto.InvestmentDTO;
 
public interface InvestmentService {
 
    InvestmentDTO saveInvestment(
            InvestmentDTO dto);
 
    InvestmentDTO getInvestmentById(
            Long investmentId);
 
    List<InvestmentDTO> getAllInvestments();
 
    InvestmentDTO updateInvestment(
            Long investmentId,
            InvestmentDTO dto);
 
    void deleteInvestment(
            Long investmentId);
}
 