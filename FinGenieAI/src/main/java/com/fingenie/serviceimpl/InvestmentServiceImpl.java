package com.fingenie.serviceimpl;
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.InvestmentDTO;
import com.fingenie.entity.Investment;
import com.fingenie.entity.User;
import com.fingenie.repository.InvestmentRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.service.InvestmentService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class InvestmentServiceImpl
        implements InvestmentService {
 
    private final InvestmentRepository investmentRepository;
    private final UserRepository userRepository;
 
    @Override
    public InvestmentDTO saveInvestment(
            InvestmentDTO dto) {
 
        User user = userRepository.findById(
                dto.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
 
        Investment investment =
                Investment.builder()
                        .fundName(
                                dto.getFundName())
                        .amount(
                                dto.getAmount())
                        .riskLevel(
                                dto.getRiskLevel())
                        .user(user)
                        .build();
 
        Investment saved =
                investmentRepository.save(
                        investment);
 
        dto.setInvestmentId(
                saved.getInvestmentId());
 
        return dto;
    }
 
    @Override
    public InvestmentDTO getInvestmentById(
            Long investmentId) {
 
        Investment investment =
                investmentRepository.findById(
                        investmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Investment not found"));
 
        InvestmentDTO dto =
                new InvestmentDTO();
 
        dto.setInvestmentId(
                investment.getInvestmentId());
 
        dto.setFundName(
                investment.getFundName());
 
        dto.setAmount(
                investment.getAmount());
 
        dto.setRiskLevel(
                investment.getRiskLevel());
 
        if (investment.getUser() != null) {
 
            dto.setUserId(
                    investment.getUser()
                            .getUserId());
        }
 
        return dto;
    }
 
    @Override
    public List<InvestmentDTO> getAllInvestments() {
 
        return investmentRepository.findAll()
                .stream()
                .map(inv -> {
 
                    InvestmentDTO dto =
                            new InvestmentDTO();
 
                    dto.setInvestmentId(
                            inv.getInvestmentId());
 
                    dto.setFundName(
                            inv.getFundName());
 
                    dto.setAmount(
                            inv.getAmount());
 
                    dto.setRiskLevel(
                            inv.getRiskLevel());
 
                    if (inv.getUser() != null) {
 
                        dto.setUserId(
                                inv.getUser()
                                        .getUserId());
                    }
 
                    return dto;
                })
                .toList();
    }
 
    @Override
    public InvestmentDTO updateInvestment(
            Long investmentId,
            InvestmentDTO dto) {
 
        Investment investment =
                investmentRepository.findById(
                        investmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Investment not found"));
 
        investment.setFundName(
                dto.getFundName());
 
        investment.setAmount(
                dto.getAmount());
 
        investment.setRiskLevel(
                dto.getRiskLevel());
 
        Investment updated =
                investmentRepository.save(
                        investment);
 
        InvestmentDTO response =
                new InvestmentDTO();
 
        response.setInvestmentId(
                updated.getInvestmentId());
 
        response.setFundName(
                updated.getFundName());
 
        response.setAmount(
                updated.getAmount());
 
        response.setRiskLevel(
                updated.getRiskLevel());
 
        response.setUserId(
                updated.getUser()
                        .getUserId());
 
        return response;
    }
 
    @Override
    public void deleteInvestment(
            Long investmentId) {
 
        investmentRepository.deleteById(
                investmentId);
    }
}
 