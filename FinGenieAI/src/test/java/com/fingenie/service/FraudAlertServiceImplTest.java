package com.fingenie.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fingenie.dto.FraudAlertDTO;
import com.fingenie.entity.FraudAlert;
import com.fingenie.entity.Transaction;
import com.fingenie.repository.FraudAlertRepository;
import com.fingenie.repository.TransactionRepository;
import com.fingenie.serviceimpl.FraudAlertServiceImpl;

@ExtendWith(MockitoExtension.class)
class FraudAlertServiceImplTest {

    @Mock
    private FraudAlertRepository fraudAlertRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private FraudAlertServiceImpl fraudAlertService;

    private Transaction transaction;
    private FraudAlert fraudAlert;
    private FraudAlertDTO fraudAlertDTO;

    @BeforeEach
    void setUp() {

        transaction = Transaction.builder()
                .transactionId(1L)
                .amount(75000.0)
                .transactionType("DEBIT")
                .description("Large Transaction")
                .build();

        fraudAlert = FraudAlert.builder()
                .fraudId(100L)
                .riskScore(90.0)
                .remarks("Large Transaction Detected")
                .status("HIGH")
                .transaction(transaction)
                .build();

        fraudAlertDTO = new FraudAlertDTO();
        fraudAlertDTO.setFraudId(100L);
        fraudAlertDTO.setRiskScore(90.0);
        fraudAlertDTO.setRemarks("Large Transaction Detected");
        fraudAlertDTO.setStatus("HIGH");
        fraudAlertDTO.setTransactionId(1L);
    }

    @Test
    void saveFraudAlert_ShouldSaveFraudAlertSuccessfully() {

        when(transactionRepository.findById(1L))
                .thenReturn(Optional.of(transaction));

        when(fraudAlertRepository.save(any(FraudAlert.class)))
                .thenReturn(fraudAlert);

        FraudAlertDTO result =
                fraudAlertService.saveFraudAlert(fraudAlertDTO);

        assertNotNull(result);
        assertEquals(100L, result.getFraudId());

        verify(fraudAlertRepository, times(1))
                .save(any(FraudAlert.class));
    }

    @Test
    void saveFraudAlert_ShouldThrowException_WhenTransactionNotFound() {

        when(transactionRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> fraudAlertService.saveFraudAlert(fraudAlertDTO));

        assertEquals(
                "Transaction not found",
                exception.getMessage());
    }

    @Test
    void getAllFraudAlerts_ShouldReturnAllFraudAlerts() {

        when(fraudAlertRepository.findAll())
                .thenReturn(Arrays.asList(fraudAlert));

        List<FraudAlertDTO> result =
                fraudAlertService.getAllFraudAlerts();

        assertNotNull(result);
        assertEquals(1, result.size());

        assertEquals(
                "HIGH",
                result.get(0).getStatus());

        assertEquals(
                90.0,
                result.get(0).getRiskScore());

        assertEquals(
                1L,
                result.get(0).getTransactionId());
    }

    @Test
    void getAllFraudAlerts_ShouldReturnEmptyList() {

        when(fraudAlertRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<FraudAlertDTO> result =
                fraudAlertService.getAllFraudAlerts();

        assertTrue(result.isEmpty());
    }
}
