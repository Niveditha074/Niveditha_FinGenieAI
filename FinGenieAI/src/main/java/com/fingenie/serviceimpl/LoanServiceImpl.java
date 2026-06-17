package com.fingenie.serviceimpl;
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.LoanDTO;
import com.fingenie.entity.Loan;
import com.fingenie.entity.User;
import com.fingenie.repository.LoanRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.service.LoanService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {
 
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
 
    @Override
    public LoanDTO applyLoan(LoanDTO dto) {
 
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
 
        String status =
                dto.getCreditScore() >= 700
                        ? "APPROVED"
                        : "REJECTED";
 
        Loan loan = Loan.builder()
                .loanType(dto.getLoanType())
                .amount(dto.getAmount())
                .salary(dto.getSalary())
                .creditScore(dto.getCreditScore())
                .status(status)
                .user(user)
                .build();
 
        Loan saved = loanRepository.save(loan);
 
        dto.setLoanId(saved.getLoanId());
        dto.setStatus(saved.getStatus());
 
        return dto;
    }
 
    @Override
    public LoanDTO getLoanById(Long loanId) {
 
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() ->
                        new RuntimeException("Loan not found"));
 
        LoanDTO dto = new LoanDTO();
 
        dto.setLoanId(loan.getLoanId());
        dto.setLoanType(loan.getLoanType());
        dto.setAmount(loan.getAmount());
        dto.setSalary(loan.getSalary());
        dto.setCreditScore(loan.getCreditScore());
        dto.setStatus(loan.getStatus());
 
        if (loan.getUser() != null) {
            dto.setUserId(
                    loan.getUser().getUserId());
        }
 
        return dto;
    }
 
    @Override
    public List<LoanDTO> getAllLoans() {
 
        return loanRepository.findAll()
                .stream()
                .map(loan -> {
 
                    LoanDTO dto = new LoanDTO();
 
                    dto.setLoanId(loan.getLoanId());
                    dto.setLoanType(loan.getLoanType());
                    dto.setAmount(loan.getAmount());
                    dto.setSalary(loan.getSalary());
                    dto.setCreditScore(loan.getCreditScore());
                    dto.setStatus(loan.getStatus());
 
                    if (loan.getUser() != null) {
                        dto.setUserId(
                                loan.getUser().getUserId());
                    }
 
                    return dto;
                })
                .toList();
    }
}
 