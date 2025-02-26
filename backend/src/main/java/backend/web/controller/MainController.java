package backend.web.controller;

import backend.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final JwtUtil jwtUtil;

    @GetMapping("/")
    public String main() {
        //username
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("username = " + username);

        String role = getRole();
        System.out.println("role = " + role);


        return "Main";
    }

    // role 값 반환
    private static String getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        return auth.getAuthority();
    }

    @GetMapping("/mypage")
    public Map<String, String> mypage(@RequestHeader("Authorization") String token) {
        //System.out.println("받은 토큰 = " + token);

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);  // "Bearer " 제거
        }

        try {
            String username = jwtUtil.getUsername(token);
            System.out.println("토큰에서 추출한 사용자: " + username);

            Map<String, String> response = new HashMap<>();
            response.put("username", username);
            return response;
        } catch (Exception e) {
            System.out.println("JWT 검증 실패: " + e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid token");
        }
    }
}
