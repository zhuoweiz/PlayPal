package com.example.server.data;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.sql.Time;

@Entity
@Table(name = "Comments")
public class Comment extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long userId;
    private String content;

    public Comment(){
    }
    public Comment(int userId, String content) {
        this.userId = userId;
        this.content = content;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setUserId(Long userId){ this.userId = userId; }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getId() {
        return id;
    }
    public Long getUserId() {
        return userId;
    }
    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "Comment: Id: " + id + "userId" + userId + " content: " + content;
    }
}
