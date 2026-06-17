package com.fingenie.serviceimpl;
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.fingenie.dto.FraudAlertDTO;
import com.fingenie.entity.FraudAlert;
import com.fingenie.entity.Transaction;
import com.fingenie.repository.FraudAlertRepository;
import com.fingenie.repository.TransactionRepository;
import com.fingenie.service.FraudAlertService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class FraudAlertServiceImpl implements FraudAlertService {
 
    private final FraudAlertRepository fraudAlertRepository;
    private final TransactionRepository transactionRepository;
 
    @Override
    public FraudAlertDTO saveFraudAlert(FraudAlertDTO dto) {
 
        Transaction transaction =
                transactionRepository.findById(dto.getTransactionId())
                        .orElseThrow(() ->
                                new RuntimeException("Transaction not found"));
 
        FraudAlert alert = FraudAlert.builder()
                .riskScore(dto.getRiskScore())
                .remarks(dto.getRemarks())
                .status(dto.getStatus())
                .transaction(transaction)
                .build();
 
        FraudAlert saved = fraudAlertRepository.save(alert);
 
        dto.setFraudId(saved.getFraudId());
 
        return dto;
    }
 
    @Override
    public List<FraudAlertDTO> getAllFraudAlerts() {
 
        return fraudAlertRepository.findAll()
                .stream()
                .map(alert -> {
                    FraudAlertDTO dto = new FraudAlertDTO();
 
                    dto.setFraudId(alert.getFraudId());
                    dto.setRiskScore(alert.getRiskScore());
                    dto.setRemarks(alert.getRemarks());
                    dto.setStatus(alert.getStatus());
 
                    if (alert.getTransaction() != null) {
                        dto.setTransactionId(
                                alert.getTransaction().getTransactionId());
                    }
 
                    return dto;
                })
                .toList();
    }
}