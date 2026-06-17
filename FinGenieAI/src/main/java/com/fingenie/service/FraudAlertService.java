package com.fingenie.service;
 
import java.util.List;
import com.fingenie.dto.FraudAlertDTO;
 
public interface FraudAlertService {
 
    FraudAlertDTO saveFraudAlert(
            FraudAlertDTO dto);
 
    List<FraudAlertDTO> getAllFraudAlerts();
}
 