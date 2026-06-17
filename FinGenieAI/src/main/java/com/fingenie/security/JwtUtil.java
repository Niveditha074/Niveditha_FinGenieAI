package com.fingenie.security;
 
import java.security.Key;
import java.util.Date;
 
import org.springframework.stereotype.Component;
 
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
 
@Component
public class JwtUtil {
 
    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkeymysecretkey";
 
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
 
    public String generateToken(String username) {
 
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis()
                                + 1000 * 60 * 60))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
 
    public String extractUsername(String token) {
 
        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
 
        return claims.getSubject();
    }
 
    public boolean validateToken(String token,
                                 String username) {
 
        return extractUsername(token)
                .equals(username);
    }
}
