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

import com.fingenie.dto.InvestmentDTO;
import com.fingenie.entity.Investment;
import com.fingenie.entity.User;
import com.fingenie.repository.InvestmentRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.serviceimpl.InvestmentServiceImpl;

@ExtendWith(MockitoExtension.class)
class InvestmentServiceImplTest {

    @Mock
    private InvestmentRepository investmentRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private InvestmentServiceImpl investmentService;

    private User user;
    private Investment investment;
    private InvestmentDTO investmentDTO;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .userId(1L)
                .build();

        investment = Investment.builder()
                .investmentId(100L)
                .fundName("Mutual Fund")
                .amount(50000.0)
                .riskLevel("Medium")
                .user(user)
                .build();

        investmentDTO = new InvestmentDTO();
        investmentDTO.setInvestmentId(100L);
        investmentDTO.setFundName("Mutual Fund");
        investmentDTO.setAmount(50000.0);
        investmentDTO.setRiskLevel("Medium");
        investmentDTO.setUserId(1L);
    }

    @Test
    void saveInvestment_ShouldSaveInvestmentSuccessfully() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(investmentRepository.save(any(Investment.class)))
                .thenReturn(investment);

        InvestmentDTO result =
                investmentService.saveInvestment(investmentDTO);

        assertNotNull(result);
        assertEquals("Mutual Fund", result.getFundName());

        verify(investmentRepository, times(1))
                .save(any(Investment.class));
    }

    @Test
    void saveInvestment_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> investmentService.saveInvestment(investmentDTO));

        assertEquals("User not found",
                exception.getMessage());
    }

    @Test
    void getInvestmentById_ShouldReturnInvestment() {

        when(investmentRepository.findById(100L))
                .thenReturn(Optional.of(investment));

        InvestmentDTO result =
                investmentService.getInvestmentById(100L);

        assertNotNull(result);
        assertEquals(100L, result.getInvestmentId());
        assertEquals("Mutual Fund", result.getFundName());
    }

    @Test
    void getInvestmentById_ShouldThrowException_WhenInvestmentNotFound() {

        when(investmentRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> investmentService.getInvestmentById(100L));

        assertEquals("Investment not found",
                exception.getMessage());
    }

    @Test
    void getAllInvestments_ShouldReturnAllInvestments() {

        when(investmentRepository.findAll())
                .thenReturn(Arrays.asList(investment));

        List<InvestmentDTO> result =
                investmentService.getAllInvestments();

        assertEquals(1, result.size());
        assertEquals("Mutual Fund",
                result.get(0).getFundName());
    }

    @Test
    void getAllInvestments_ShouldReturnEmptyList() {

        when(investmentRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<InvestmentDTO> result =
                investmentService.getAllInvestments();

        assertTrue(result.isEmpty());
    }

    @Test
    void updateInvestment_ShouldUpdateInvestment() {

        Investment updatedInvestment =
                Investment.builder()
                        .investmentId(100L)
                        .fundName("SIP Fund")
                        .amount(75000.0)
                        .riskLevel("High")
                        .user(user)
                        .build();

        InvestmentDTO updateDTO =
                new InvestmentDTO();

        updateDTO.setFundName("SIP Fund");
        updateDTO.setAmount(75000.0);
        updateDTO.setRiskLevel("High");

        when(investmentRepository.findById(100L))
                .thenReturn(Optional.of(investment));

        when(investmentRepository.save(any(Investment.class)))
                .thenReturn(updatedInvestment);

        InvestmentDTO result =
                investmentService.updateInvestment(
                        100L,
                        updateDTO);

        assertNotNull(result);
        assertEquals("SIP Fund",
                result.getFundName());
        assertEquals(75000.0,
                result.getAmount());
    }

    @Test
    void updateInvestment_ShouldThrowException_WhenInvestmentNotFound() {

        when(investmentRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> investmentService.updateInvestment(
                                100L,
                                investmentDTO));

        assertEquals("Investment not found",
                exception.getMessage());
    }

    @Test
    void deleteInvestment_ShouldDeleteInvestment() {

        doNothing()
                .when(investmentRepository)
                .deleteById(100L);

        investmentService.deleteInvestment(100L);

        verify(investmentRepository, times(1))
                .deleteById(100L);
    }
}
