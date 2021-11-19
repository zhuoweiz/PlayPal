package com.example.server.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private User creator;

    public Post() {
    }

    public Post(int userId, String title, String content) {
        this.userId = userId;
        this.title = title;
        this.content = content;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getContent() {
        return content;
    }

    public Long getCreatorId() {
        return creator.getId();
    }
    public void setCreator(User user) {
        creator = user;
    }
    public User getCreator() {
        return creator;
    }

    @Override
    public String toString() {
        return "Post: Id: " + id + "creatorId" + creator.getId() + " title: " + title + " content: " + content;
    }
}
