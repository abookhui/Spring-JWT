package backend.jwt;

import backend.domain.member.CustomUserDetail;
import backend.domain.member.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter  {// 요청에 대해 1번만 요청하는 클래스

    private final JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        if(authorization ==null || !authorization.startsWith("Bearer ")){
            log.error("token null");

            filterChain.doFilter(request,response);
            return;
        }

        String token = authorization.split(" ")[1]; // Bearer 제거, token만 획득

        if(jwtUtil.isExpired(token)){
            log.error("token is expired");
            filterChain.doFilter(request,response);
            return;
        }

        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        UserEntity member = new UserEntity();
        member.setUsername(username);
        member.setRole(role);
        member.setPassword("tempPassword");

        CustomUserDetail customUserDetail = new CustomUserDetail(member);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(customUserDetail, null, customUserDetail.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request,response);
    }
}
