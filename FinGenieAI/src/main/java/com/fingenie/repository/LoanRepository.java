package com.fingenie.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.fingenie.entity.Loan;
 
public interface LoanRepository
        extends JpaRepository<Loan, Long> {
 
    List<Loan> findByUserUserId(Long userId);
}