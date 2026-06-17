package com.fingenie.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.fingenie.entity.FraudAlert;
 
public interface FraudAlertRepository
        extends JpaRepository<FraudAlert, Long> {
 
}