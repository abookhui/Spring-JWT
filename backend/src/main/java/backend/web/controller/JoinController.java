package backend.web.controller;


import backend.domain.dto.JoinDto;
import backend.domain.member.JoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JoinController {

    private final JoinService joinService;

    @GetMapping("/join")
    public String join() {
        return "Join";
    }

    @PostMapping("/join")
    public String joinProcess(@RequestBody JoinDto joinDto) {
        log.info("joinDto.getUsername() = {}", joinDto.getUsername());

        joinService.joinProcess(joinDto);

        return "ok";
    }
}
