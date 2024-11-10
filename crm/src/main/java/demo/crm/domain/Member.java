package demo.crm.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue
    @Column(name = "generated_id")
    private Long gen_id;

    private String id;
    private String password;
    private String name;
    private String phone;
    private String email;
    private Date birth;
}
