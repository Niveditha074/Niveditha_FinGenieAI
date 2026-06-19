package com.fingenie.security;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;
 
@Configuration
@EnableWebSecurity
public class SecurityConfig {
 
    private final JwtFilter jwtFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
 
    public SecurityConfig(JwtFilter jwtFilter,
                         JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.jwtFilter = jwtFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }
 
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/login").permitAll()
                .requestMatchers("/api/admin/register").permitAll()
              
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            );
 
        http.addFilterBefore(jwtFilter,
            UsernamePasswordAuthenticationFilter.class);
 
        return http.build();
    }
 
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:3003"
        ));
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", "Content-Type", "Accept"
        ));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
 
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
 