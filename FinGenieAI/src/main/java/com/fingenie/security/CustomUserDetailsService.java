package com.fingenie.security;
 
import java.util.Collections;
 
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
 
import com.fingenie.entity.Admin;
import com.fingenie.repository.AdminRepository;
import com.fingenie.repository.UserRepository;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
        implements UserDetailsService {
 
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
 
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
 
        // Check USER table first
        var userOptional =
                userRepository.findByEmail(email);
 
        if (userOptional.isPresent()) {
 
            com.fingenie.entity.User user =
                    userOptional.get();
 
            return new User(
                    user.getEmail(),
                    user.getPassword(),
                    Collections.emptyList());
        }
 
        // Check ADMIN table
        var adminOptional =
                adminRepository.findByEmail(email);
 
        if (adminOptional.isPresent()) {
 
            Admin admin =
                    adminOptional.get();
 
            return new User(
                    admin.getEmail(),
                    admin.getPassword(),
                    Collections.emptyList());
        }
 
        throw new UsernameNotFoundException(
                "User/Admin not found");
    }
}