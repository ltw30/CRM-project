package demo.crm.repository;

import demo.crm.domain.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    // 회원 저장 메서드
    public void save(Member member) {
        em.persist(member);
    }

    // 회원 조회 메서드 (회원 단건 포함)
    public Member findById(Long id) {
        return em.find(Member.class, id);
    }

    // 회원 조회 메서드 (회원 리스트 조회)
    public List<Member> findAll() {
        List<Member> result = em.createQuery("select m from Member m", Member.class).getResultList();
        return result;
    }

    // 회원 조회 메서드 (이름으로 조회)
    public List<Member> findByName(String name) {
        return em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
    }
}
