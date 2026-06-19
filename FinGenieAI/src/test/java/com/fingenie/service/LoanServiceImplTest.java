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

import com.fingenie.dto.LoanDTO;
import com.fingenie.entity.Loan;
import com.fingenie.entity.User;
import com.fingenie.repository.LoanRepository;
import com.fingenie.repository.UserRepository;
import com.fingenie.serviceimpl.LoanServiceImpl;

@ExtendWith(MockitoExtension.class)
class LoanServiceImplTest {

    @Mock
    private LoanRepository loanRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LoanServiceImpl loanService;

    private User user;
    private Loan loan;
    private LoanDTO loanDTO;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .userId(1L)
                .build();

        loan = Loan.builder()
                .loanId(100L)
                .loanType("Home Loan")
                .amount(500000.0)
                .salary(50000.0)
                .creditScore(750)
                .status("APPROVED")
                .user(user)
                .build();

        loanDTO = new LoanDTO();
        loanDTO.setLoanId(100L);
        loanDTO.setLoanType("Home Loan");
        loanDTO.setAmount(500000.0);
        loanDTO.setSalary(50000.0);
        loanDTO.setCreditScore(750);
        loanDTO.setUserId(1L);
    }

    @Test
    void applyLoan_ShouldApproveLoan_WhenCreditScoreAbove700() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(loanRepository.save(any(Loan.class)))
                .thenReturn(loan);

        LoanDTO result = loanService.applyLoan(loanDTO);

        assertNotNull(result);
        assertEquals("APPROVED", result.getStatus());
    }

    @Test
    void applyLoan_ShouldRejectLoan_WhenCreditScoreBelow700() {

        Loan rejectedLoan = Loan.builder()
                .loanId(101L)
                .loanType("Personal Loan")
                .amount(200000.0)
                .salary(30000.0)
                .creditScore(650)
                .status("REJECTED")
                .user(user)
                .build();

        LoanDTO dto = new LoanDTO();
        dto.setLoanType("Personal Loan");
        dto.setAmount(200000.0);
        dto.setSalary(30000.0);
        dto.setCreditScore(650);
        dto.setUserId(1L);

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(loanRepository.save(any(Loan.class)))
                .thenReturn(rejectedLoan);

        LoanDTO result = loanService.applyLoan(dto);

        assertNotNull(result);
        assertEquals("REJECTED", result.getStatus());
    }

    @Test
    void applyLoan_ShouldThrowException_WhenUserNotFound() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> loanService.applyLoan(loanDTO));

        assertEquals("User not found",
                exception.getMessage());
    }

    @Test
    void getLoanById_ShouldReturnLoan() {

        when(loanRepository.findById(100L))
                .thenReturn(Optional.of(loan));

        LoanDTO result = loanService.getLoanById(100L);

        assertNotNull(result);
        assertEquals(100L, result.getLoanId());
        assertEquals("Home Loan", result.getLoanType());
        assertEquals("APPROVED", result.getStatus());
    }

    @Test
    void getLoanById_ShouldThrowException_WhenLoanNotFound() {

        when(loanRepository.findById(100L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> loanService.getLoanById(100L));

        assertEquals("Loan not found",
                exception.getMessage());
    }

    @Test
    void getAllLoans_ShouldReturnAllLoans() {

        when(loanRepository.findAll())
                .thenReturn(Arrays.asList(loan));

        List<LoanDTO> result = loanService.getAllLoans();

        assertEquals(1, result.size());
        assertEquals("Home Loan",
                result.get(0).getLoanType());
    }

    @Test
    void getAllLoans_ShouldReturnEmptyList() {

        when(loanRepository.findAll())
                .thenReturn(Collections.emptyList());

        List<LoanDTO> result = loanService.getAllLoans();

        assertTrue(result.isEmpty());
    }
}