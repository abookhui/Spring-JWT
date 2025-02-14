package backend.domain.member;

import backend.domain.dto.JoinDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    // save같이 기본에서는 Transactional이 적용되지만, 직접 만든 메소드는 Transactional을 붙여줘야 한다.
    // @Transactional
    public void joinProcess(JoinDto joinDto) {

        String username = joinDto.getUsername();
        String password = joinDto.getPassword();

        boolean existsByUsername = userRepository.existsByUsername(username);

        if(existsByUsername) {
            throw new IllegalArgumentException("이미 존재하는 회원입니다.");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(encoder.encode(password));
        userEntity.setRole("ROLE_USER");

        userRepository.save(userEntity);
    }
}
