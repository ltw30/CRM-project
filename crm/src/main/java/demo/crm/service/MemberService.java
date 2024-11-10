package demo.crm.service;

import demo.crm.domain.Member;
import demo.crm.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


    // 회원 가입
    @Transactional
    public Long join(Member member) {
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getGen_id();
    }

    private void validateDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByName(member.getName());
        if (!findMembers.isEmpty()) { // findMember.isEmpty()가 참이 아니면, 중복 회원이 있다는 뜻 -> 뭔가 잘못되었다는 것
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

}
